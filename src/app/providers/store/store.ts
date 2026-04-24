import { create } from "zustand";

const ACTIVE_CHAT_STORAGE_KEY = "activeChatId";

const getInitialSelectedChatId = () => {
  try {
    return localStorage.getItem(ACTIVE_CHAT_STORAGE_KEY);
  } catch {
    return null;
  }
};

type UiState = {
  isHistoryOpen: boolean;
  selectedChatId: string | null;
  setHistoryOpen: (value: boolean) => void;
  setSelectedChatId: (chatId: string | null) => void;
};

export const useUiStore = create<UiState>((set) => ({
  isHistoryOpen: false,
  selectedChatId: getInitialSelectedChatId(),
  setHistoryOpen: (value) => set({ isHistoryOpen: value }),
  setSelectedChatId: (chatId) => {
    try {
      if (chatId) {
        localStorage.setItem(ACTIVE_CHAT_STORAGE_KEY, chatId);
      } else {
        localStorage.removeItem(ACTIVE_CHAT_STORAGE_KEY);
      }
    } catch {
      // Ignore storage failures.
    }
    set({ selectedChatId: chatId });
  },
}));
