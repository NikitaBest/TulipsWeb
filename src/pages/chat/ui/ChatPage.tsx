import { useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PageContainer } from "@/shared/ui/page-container";
import { useUiStore } from "@/app/providers/store/store";
import { chatsApi, type ChatMessage } from "@/shared/api/chats";
import { ChatLayout } from "@/widgets/chat-layout";
import { ChatHistorySidebar } from "@/widgets/chat-history-sidebar";
import { ChatInputPanel } from "@/widgets/chat-input-panel";
import styles from "./ChatPage.module.css";

export const ChatPage = () => {
  const isHistoryOpen = useUiStore((state) => state.isHistoryOpen);
  const setHistoryOpen = useUiStore((state) => state.setHistoryOpen);
  const selectedChatId = useUiStore((state) => state.selectedChatId);
  const setSelectedChatId = useUiStore((state) => state.setSelectedChatId);
  const hasSelectedChat = Boolean(selectedChatId);
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [pendingMessageId, setPendingMessageId] = useState<string | null>(null);
  const [chatError, setChatError] = useState<string | null>(null);
  const [failedImageUrls, setFailedImageUrls] = useState<string[]>([]);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const { data: messages = [] } = useQuery<ChatMessage[]>({
    queryKey: ["messages", selectedChatId],
    queryFn: () => chatsApi.getMessages(selectedChatId as string, 1, 50),
    enabled: hasSelectedChat,
    refetchInterval: (query) => {
      const data = query.state.data ?? [];
      const hasInFlight = data.some((message) => message.status === "queued" || message.status === "processing");
      return hasInFlight || Boolean(pendingMessageId) ? 2000 : false;
    },
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const { data: messageWithNext = [] } = useQuery({
    queryKey: ["message-next", pendingMessageId],
    queryFn: () => chatsApi.getMessageWithNext(pendingMessageId as string, 2),
    enabled: Boolean(pendingMessageId),
    refetchInterval: (query) => {
      const chain = query.state.data ?? [];
      return chain.length > 1 ? false : 2000;
    },
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const sendMessageMutation = useMutation({
    mutationFn: (payload: { chatId: string; text: string; images: File[] }) =>
      chatsApi.sendMessage(payload.chatId, {
        text: payload.text,
        images: payload.images,
      }),
    onSuccess: async (result) => {
      setChatError(null);
      setPendingMessageId(result.messageId);
      await queryClient.invalidateQueries({ queryKey: ["messages", selectedChatId] });
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const replayJobMutation = useMutation({
    mutationFn: async (payload: { jobId: string }) => {
      await chatsApi.replayFailedJob(payload.jobId);
    },
    onSuccess: async () => {
      setChatError(null);
      await queryClient.invalidateQueries({ queryKey: ["messages", selectedChatId] });
      await queryClient.invalidateQueries({ queryKey: ["chats"] });
    },
  });

  const hasMessages = messages.length > 0;
  const hasProcessing = messages.some((message) => message.status === "queued" || message.status === "processing");
  const isAwaitingAssistant = Boolean(pendingMessageId) && messageWithNext.length <= 1;
  const isInputLocked = hasProcessing || isAwaitingAssistant || sendMessageMutation.isPending;

  useEffect(() => {
    if (!pendingMessageId || messageWithNext.length <= 1) {
      return;
    }
    const timer = window.setTimeout(() => {
      setPendingMessageId(null);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [pendingMessageId, messageWithNext.length]);

  const ensureChatId = async (): Promise<string> => {
    if (selectedChatId) {
      return selectedChatId;
    }

    const chat = await chatsApi.createChat();
    setSelectedChatId(chat.id);
    await queryClient.invalidateQueries({ queryKey: ["chats"] });
    return chat.id;
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length]);

  useEffect(() => {
    if (!previewImageUrl) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewImageUrl(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewImageUrl]);

  return (
    <ChatLayout>
      <PageContainer>
        <div className={styles.grid}>
          <section className={styles.main}>
            {hasMessages ? (
              <section className={styles.messages}>
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={
                      message.role === "user"
                        ? styles.messageUser
                        : message.role === "system"
                          ? styles.messageSystem
                          : styles.messageAssistant
                    }
                  >
                    {message.imageUrls.filter((imageUrl) => !failedImageUrls.includes(imageUrl)).length > 0 ? (
                      <div className={styles.messageImages}>
                        {message.imageUrls
                          .filter((imageUrl) => !failedImageUrls.includes(imageUrl))
                          .map((imageUrl) => (
                            <img
                              key={imageUrl}
                              className={styles.messageImage}
                              src={imageUrl}
                              alt="Вложение сообщения"
                              loading="lazy"
                              onClick={() => setPreviewImageUrl(imageUrl)}
                              onError={() => {
                                setFailedImageUrls((prev) => (prev.includes(imageUrl) ? prev : [...prev, imageUrl]));
                              }}
                            />
                          ))}
                      </div>
                    ) : null}
                    {message.text ? (
                      <div
                        className={styles.messageText}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.text) }}
                      />
                    ) : null}
                    {message.status === "queued" || message.status === "processing" ? (
                      <span className={styles.messageStatus}>AI готовит ответ...</span>
                    ) : null}
                    {message.status === "failed" ? (
                      <div className={styles.failedBlock}>
                        <span className={styles.messageStatusError}>
                          {message.failureReason ?? "Не удалось обработать сообщение"}
                        </span>
                        {message.failedJobId ? (
                          <button
                            type="button"
                            className={styles.retryButton}
                            disabled={replayJobMutation.isPending}
                            onClick={async () => {
                              await replayJobMutation.mutateAsync({
                                jobId: message.failedJobId as string,
                              });
                            }}
                          >
                            {replayJobMutation.isPending ? "Повторяем..." : "Повторить"}
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                ))}
                {hasProcessing || isAwaitingAssistant ? (
                  <article className={styles.messageAssistant}>
                    <div className={styles.typing}>
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                      <span className={styles.typingDot} />
                    </div>
                  </article>
                ) : null}
                <div ref={messagesEndRef} />
              </section>
            ) : (
              <div className={styles.welcome}>
                <img className={styles.welcomeIcon} src="/1.png" alt="Иконка AI Flower Assistant" />
                <h1 className={styles.welcomeTitle}>Чем помочь с вашими цветами сегодня?</h1>
              </div>
            )}
            <div className={styles.inputDock}>
              <ChatInputPanel
                disabled={isInputLocked}
                isSending={sendMessageMutation.isPending}
                hint={isInputLocked ? "Пожалуйста, дождитесь ответа ассистента. Пока отправка недоступна." : undefined}
                onSubmit={async (payload) => {
                  try {
                    const chatId = await ensureChatId();
                    await sendMessageMutation.mutateAsync({
                      chatId,
                      text: payload.text,
                      images: payload.images,
                    });
                  } catch {
                    setChatError("Не удалось отправить сообщение. Проверьте сеть и попробуйте снова.");
                  }
                }}
              />
              {chatError ? <p className={styles.chatError}>{chatError}</p> : null}
            </div>
          </section>
        </div>
      </PageContainer>

      {isHistoryOpen ? (
        <div
          className={styles.historyOverlay}
          role="presentation"
          onClick={() => setHistoryOpen(false)}
        >
          <div className={styles.historyMobileWrap} role="presentation" onClick={(event) => event.stopPropagation()}>
            <ChatHistorySidebar
              className={styles.historyMobile}
              mobile
              onClose={() => setHistoryOpen(false)}
            />
          </div>
        </div>
      ) : null}

      {previewImageUrl ? (
        <div
          className={styles.imagePreviewOverlay}
          role="presentation"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div className={styles.imagePreviewDialog} role="presentation" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className={styles.imagePreviewClose}
              aria-label="Закрыть просмотр изображения"
              onClick={() => setPreviewImageUrl(null)}
            >
              ✕
            </button>
            <img className={styles.imagePreview} src={previewImageUrl} alt="Увеличенное изображение" />
          </div>
        </div>
      ) : null}
    </ChatLayout>
  );
};
