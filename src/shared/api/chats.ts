import { http } from "@/shared/api/http";
import { isGuid } from "@/shared/lib/ids";

type Result<T> = {
  isSuccess: boolean;
  error?: string | null;
  value?: T | null;
};

type PagedList<T> = {
  data: T[];
};

type ChatEntity = {
  id: string;
  title?: string | null;
  status?: number;
  updatedAt?: string | null;
  createdAt: string;
};

type CreateChatResponse = {
  chatId: string;
  createdAt: string;
  status?: number;
};

type ChatByIdEntity = {
  chatId: string;
  userId?: string;
  title?: string | null;
  status?: "Idle" | "Processing" | "Error" | null;
  createdAt?: string;
  updatedAt?: string | null;
  lastMessageAt?: string | null;
  isProcessing?: boolean;
};

type MessageImageEntity = {
  storageUrl: string;
};

type ProcessingJobEntity = {
  id: string;
  status: number;
};

type MessageEntity = {
  id: string;
  role: number;
  status: number;
  textHtml?: string | null;
  failureReason?: string | null;
  images?: MessageImageEntity[];
  processingJobs?: ProcessingJobEntity[];
  createdAt: string;
};

type SendMessageResponse = {
  messageId: string;
  status: string;
  createdAt: string;
};

type ReplayFailedJobResponse = {
  jobId: string;
  status: string;
};

export type ChatListItem = {
  id: string;
  title: string;
  status: "idle" | "processing" | "error";
  updatedAt: string;
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  status: "queued" | "processing" | "completed" | "failed";
  text: string;
  failureReason: string | null;
  failedJobId: string | null;
  imageUrls: string[];
  createdAt: string;
};

export type ChatDetails = {
  id: string;
  title: string;
  statusLabel: string;
  isProcessing: boolean;
};

const unwrapResult = <T>(result: Result<T>, fallbackMessage: string): T => {
  if (!result.isSuccess) {
    throw new Error(result.error ?? fallbackMessage);
  }
  if (result.value == null) {
    throw new Error(fallbackMessage);
  }
  return result.value;
};

const toChatStatus = (status?: number): ChatListItem["status"] => {
  if (status === 1) {
    return "processing";
  }
  if (status === 2) {
    return "error";
  }
  return "idle";
};

const toMessageRole = (role: number): ChatMessage["role"] => {
  if (role === 0) {
    return "user";
  }
  if (role === 2) {
    return "system";
  }
  return "assistant";
};

const toMessageStatus = (status: number): ChatMessage["status"] => {
  if (status === 0) {
    return "queued";
  }
  if (status === 1) {
    return "processing";
  }
  if (status === 3) {
    return "failed";
  }
  return "completed";
};

const toChatItem = (item: ChatEntity): ChatListItem => ({
  id: item.id,
  title: item.title?.trim() || "Новый чат",
  status: toChatStatus(item.status),
  updatedAt: item.updatedAt || item.createdAt,
  createdAt: item.createdAt,
});

const toChatMessage = (item: MessageEntity): ChatMessage => {
  // Backend can return several processing jobs for one message.
  // For retry we use the latest failed job when available.
  const failedJob = (item.processingJobs ?? []).find((job) => job.status === 3) ?? null;

  return {
    id: item.id,
    role: toMessageRole(item.role),
    status: toMessageStatus(item.status),
    text: item.textHtml ?? "",
    failureReason: item.failureReason ?? null,
    failedJobId: failedJob?.id ?? null,
    imageUrls: (item.images ?? []).map((image) => image.storageUrl),
    createdAt: item.createdAt,
  };
};

export const chatsApi = {
  async getChats(pageNumber = 1, pageSize = 50): Promise<ChatListItem[]> {
    const query = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    const result = await http<Result<PagedList<ChatEntity>>>(`chats?${query.toString()}`, {
      method: "GET",
    });

    const value = unwrapResult(result, "Chats loading failed");
    return value.data.map(toChatItem);
  },

  async createChat(title?: string): Promise<ChatListItem> {
    const result = await http<Result<CreateChatResponse>>("chats", {
      method: "POST",
      body: JSON.stringify({ title: title ?? null }),
    });

    const value = unwrapResult(result, "Chat creation failed");

    return {
      id: value.chatId,
      title: "Новый чат",
      status: toChatStatus(value.status),
      createdAt: value.createdAt,
      updatedAt: value.createdAt,
    };
  },

  async getChatById(chatId: string): Promise<ChatDetails> {
    if (!isGuid(chatId)) {
      throw new Error("Invalid chatId format");
    }

    const result = await http<Result<ChatByIdEntity>>(`chats/${chatId}`, {
      method: "GET",
    });

    const value = unwrapResult(result, "Chat details loading failed");

    const rawStatus = value.status;
    const statusLabel =
      rawStatus === "Processing"
        ? "Обработка"
        : rawStatus === "Error"
          ? "Ошибка"
          : "Готов";

    return {
      id: value.chatId || chatId,
      title: value.title?.trim() || "Новый чат",
      statusLabel,
      isProcessing: Boolean(value.isProcessing) || rawStatus === "Processing",
    };
  },

  async getMessages(chatId: string, pageNumber = 1, pageSize = 50): Promise<ChatMessage[]> {
    if (!isGuid(chatId)) {
      throw new Error("Invalid chatId format");
    }

    const query = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });

    const result = await http<Result<PagedList<MessageEntity>>>(`chats/${chatId}/messages?${query.toString()}`, {
      method: "GET",
    });

    const value = unwrapResult(result, "Messages loading failed");
    return value.data.map(toChatMessage);
  },

  async getMessageById(messageId: string): Promise<ChatMessage> {
    if (!isGuid(messageId)) {
      throw new Error("Invalid messageId format");
    }

    const result = await http<Result<MessageEntity>>(`chats/messages/${messageId}`, {
      method: "GET",
    });

    const value = unwrapResult(result, "Message loading failed");
    return toChatMessage(value);
  },

  async getMessageWithNext(messageId: string, take: number): Promise<ChatMessage[]> {
    if (!isGuid(messageId)) {
      throw new Error("Invalid messageId format");
    }

    const query = new URLSearchParams({
      take: String(take),
    });
    const result = await http<Result<MessageEntity[]>>(`chats/messages/${messageId}/next?${query.toString()}`, {
      method: "GET",
    });

    const value = unwrapResult(result, "Message chain loading failed");
    return value.map(toChatMessage);
  },

  async sendMessage(chatId: string, payload: { text?: string; images?: File[] }): Promise<SendMessageResponse> {
    if (!isGuid(chatId)) {
      throw new Error("Invalid chatId format");
    }

    const formData = new FormData();
    if (payload.text?.trim()) {
      formData.append("textHtml", payload.text.trim());
    }
    payload.images?.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("clientRequestId", crypto.randomUUID());

    const result = await http<Result<SendMessageResponse>>(`chats/${chatId}/messages`, {
      method: "POST",
      body: formData,
    });

    return unwrapResult(result, "Message sending failed");
  },

  async replayFailedJob(jobId: string): Promise<ReplayFailedJobResponse> {
    if (!isGuid(jobId)) {
      throw new Error("Invalid jobId format");
    }

    const result = await http<Result<ReplayFailedJobResponse>>(`chats/jobs/${jobId}/replay`, {
      method: "POST",
    });

    return unwrapResult(result, "Job replay failed");
  },
};
