import { useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUiStore } from "@/app/providers/store/store";
import { chatsApi } from "@/shared/api/chats";
import { classNames } from "@/shared/lib/classNames";
import styles from "./ChatHistorySidebar.module.css";

type ChatHistorySidebarProps = {
  enabled?: boolean;
  className?: string;
  mobile?: boolean;
  onClose?: () => void;
};

export const ChatHistorySidebar = ({ enabled = true, className, mobile = false, onClose }: ChatHistorySidebarProps) => {
  const selectedChatId = useUiStore((state) => state.selectedChatId);
  const setSelectedChatId = useUiStore((state) => state.setSelectedChatId);
  const queryClient = useQueryClient();

  const { data: chats = [] } = useQuery({
    queryKey: ["chats"],
    queryFn: () => chatsApi.getChats(1, 50),
    enabled,
    staleTime: 60_000,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const groupedChats = useMemo(() => {
    const groups = new Map<string, typeof chats>();
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    chats.forEach((chat) => {
      const updatedAt = new Date(chat.updatedAt);
      let label = "Ранее";

      if (updatedAt >= startOfToday) {
        label = "Сегодня";
      } else if (updatedAt >= startOfYesterday) {
        label = "Вчера";
      }

      if (!groups.has(label)) {
        groups.set(label, []);
      }

      groups.get(label)?.push(chat);
    });

    return Array.from(groups.entries());
  }, [chats]);

  const formatTime = (iso: string) =>
    new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

  const formatChatStatus = (status: "idle" | "processing" | "error") => {
    if (status === "processing") {
      return "Обработка";
    }
    if (status === "error") {
      return "Ошибка";
    }
    return "Готов";
  };

  return (
    <aside className={className}>
      <div className={classNames(styles.panel, mobile && styles.panelMobile)}>
        <div className={styles.header}>
          <h2 className={styles.title}>История чатов</h2>
          {mobile ? (
            <button
              type="button"
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть историю чатов"
            >
              ✕
            </button>
          ) : null}
        </div>

        <button
          type="button"
          className={styles.newChatButton}
          onClick={() => {
            setSelectedChatId(null);
            onClose?.();
          }}
        >
          ＋ Новый чат
        </button>

        <div className={styles.sections}>
          {chats.length === 0 ? <p className={styles.emptyState}>Пока нет чатов. Создайте первый чат.</p> : null}
          {groupedChats.map(([label, chats]) => (
            <section key={label} className={styles.section}>
              <p className={styles.sectionTitle}>{label}</p>
              <ul className={styles.list}>
                {chats.map((chat) => (
                  <li key={chat.id}>
                    <button
                      type="button"
                      className={classNames(styles.item, selectedChatId === chat.id && styles.itemActive)}
                      onClick={async () => {
                        await queryClient.fetchQuery({
                          queryKey: ["messages", chat.id],
                          queryFn: () => chatsApi.getMessages(chat.id, 1, 50),
                        });
                        await queryClient.fetchQuery({
                          queryKey: ["chat-by-id", chat.id],
                          queryFn: () => chatsApi.getChatById(chat.id),
                        });
                        setSelectedChatId(chat.id);
                        onClose?.();
                      }}
                    >
                      <span className={styles.itemTitle}>{chat.title}</span>
                      <span className={styles.itemMeta}>
                        {formatTime(chat.updatedAt)} • {formatChatStatus(chat.status)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </aside>
  );
};
