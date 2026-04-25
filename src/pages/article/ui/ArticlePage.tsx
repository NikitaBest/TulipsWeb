import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { knowledgeApi } from "@/shared/api/knowledge";
import { EmptyState } from "@/shared/ui/empty-state";
import { Card } from "@/shared/ui/card";
import { PageContainer } from "@/shared/ui/page-container";
import { AppHeader } from "@/widgets/app-header";
import styles from "./ArticlePage.module.css";

export const ArticlePage = () => {
  const { id } = useParams();
  const { data: article } = useQuery({
    queryKey: ["knowledge-article", id],
    queryFn: () => knowledgeApi.getArticleById(id as string),
    enabled: Boolean(id),
  });

  if (!article) {
    return (
      <PageContainer>
        <EmptyState title="Статья не найдена" description="Проверьте ссылку и попробуйте снова." />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className={styles.page}>
        <AppHeader title="Статья" />
        <Card className={styles.article}>
          <span className={styles.category}>{article.category ?? "Статья"}</span>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.description}</p>
          <p className={styles.content}>{article.content}</p>
        </Card>
      </section>
    </PageContainer>
  );
};
