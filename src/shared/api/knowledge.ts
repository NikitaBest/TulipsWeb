export type KnowledgeArticle = {
  id: string;
  title: string;
  description: string;
  content: string;
  category?: string;
};

export const knowledgeApi = {
  async getArticles(): Promise<KnowledgeArticle[]> {
    return [];
  },
  async getArticleById(): Promise<KnowledgeArticle | null> {
    return null;
  },
};
