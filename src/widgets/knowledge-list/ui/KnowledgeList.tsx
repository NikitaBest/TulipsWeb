import { Link } from "react-router-dom";
import type { KnowledgeArticle } from "@/shared/api/knowledge";
import { routes } from "@/shared/config/routes";
import { Card } from "@/shared/ui/card";
import styles from "./KnowledgeList.module.css";

type KnowledgeListProps = {
  articles: KnowledgeArticle[];
};

export const KnowledgeList = ({ articles }: KnowledgeListProps) => (
  <section className={styles.grid}>
    {articles.map((article) => (
      <Card key={article.id} className={styles.item}>
        <span className={styles.meta}>{article.category ?? "Статья"}</span>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.description}>{article.description}</p>
        <Link className={styles.link} to={routes.article(article.id)}>
          Читать материал
        </Link>
      </Card>
    ))}
  </section>
);
