import { http } from "@/shared/api/http";

type Result<T> = {
  isSuccess: boolean;
  error?: string | null;
  value?: T | null;
};

type KnowledgePostEntity = {
  id: string;
  title?: string | null;
  order?: number | null;
  excerpt?: string | null;
  images?: string[] | null;
  content?: string | null;
};

type KnowledgeCategoryEntity = {
  id: string;
  name?: string | null;
  order?: number | null;
  posts?: KnowledgePostEntity[] | null;
};

export type KnowledgeArticle = {
  id: string;
  title: string;
  description: string;
  content: string;
  category?: string;
  images: string[];
  order: number;
  categoryOrder: number;
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

const toArticle = (post: KnowledgePostEntity, category: KnowledgeCategoryEntity): KnowledgeArticle => ({
  id: post.id,
  title: post.title?.trim() || "Без названия",
  description: post.excerpt?.trim() || "Описание скоро появится.",
  content: post.content?.trim() || "Контент статьи пока не заполнен.",
  category: category.name?.trim() || "Статья",
  images: post.images ?? [],
  order: post.order ?? Number.MAX_SAFE_INTEGER,
  categoryOrder: category.order ?? Number.MAX_SAFE_INTEGER,
});

const toArticles = (categories: KnowledgeCategoryEntity[]): KnowledgeArticle[] =>
  categories
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
    .flatMap((category) =>
      (category.posts ?? [])
        .slice()
        .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER))
        .map((post) => toArticle(post, category)),
    );

export const knowledgeApi = {
  async getArticles(): Promise<KnowledgeArticle[]> {
    const result = await http<Result<KnowledgeCategoryEntity[]>>("knowledge/get", {
      method: "GET",
    });
    const categories = unwrapResult(result, "Knowledge base loading failed");
    return toArticles(categories);
  },
  async getArticleById(id: string): Promise<KnowledgeArticle | null> {
    const articles = await this.getArticles();
    return articles.find((article) => article.id === id) ?? null;
  },
};
