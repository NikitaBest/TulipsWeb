import { useQuery } from "@tanstack/react-query";
import { knowledgeApi } from "@/shared/api/knowledge";
import { EmptyState } from "@/shared/ui/empty-state";
import { PageContainer } from "@/shared/ui/page-container";
import { AppHeader } from "@/widgets/app-header";
import { KnowledgeList } from "@/widgets/knowledge-list";
import styles from "./KnowledgeBasePage.module.css";

export const KnowledgeBasePage = () => {
  const { data: articles = [], isPending } = useQuery({
    queryKey: ["knowledge-articles"],
    queryFn: () => knowledgeApi.getArticles(),
  });

  return (
    <PageContainer>
      <section className={styles.page}>
        <AppHeader title="База знаний" />
        <header className={styles.head}>
          <h1 className={styles.title}>Полезные материалы</h1>
          <p className={styles.subtitle}>Короткие и понятные материалы по уходу за растениями.</p>
        </header>
        {isPending ? (
          <div className={styles.loadingCard} role="status" aria-live="polite">
            <span className={styles.spinner} aria-hidden="true" />
            <span className={styles.loadingText}>Загружаем материалы...</span>
          </div>
        ) : articles.length > 0 ? (
          <KnowledgeList articles={articles} />
        ) : (
          <EmptyState title="Материалы появятся позже" description="База знаний подключается к backend API." />
        )}
      </section>
    </PageContainer>
  );
};
