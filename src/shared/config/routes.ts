export const routes = {
  landing: "/",
  chat: "/chat",
  knowledgeBase: "/knowledge-base",
  article: (id: string) => `/knowledge-base/${id}`,
} as const;
