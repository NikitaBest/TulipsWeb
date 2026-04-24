import { Link } from "react-router-dom";
import { routes } from "@/shared/config/routes";
import { Button } from "@/shared/ui/button";
import { PageContainer } from "@/shared/ui/page-container";
import styles from "./LandingPage.module.css";

export const LandingPage = () => (
  <PageContainer>
    <section className={styles.hero}>
      <div className={styles.main}>
        <h1 className={styles.title}>AI Flower Assistant</h1>
        <img className={styles.image} src="/start.png" alt="Превью распознавания цветка" />
        <p className={styles.description}>
          Определяйте цветы по фото, находите возможные проблемы растения и получайте понятные
          рекомендации по уходу в формате удобного AI-чата.
        </p>
        <Link to={routes.chat}>
          <Button className={styles.startButton}>Начать</Button>
        </Link>
      </div>
      <p className={styles.note}>
        Сервис помогает быстро разобраться, почему желтеют листья, как скорректировать полив и
        освещение, а также подсказывает базовые шаги для восстановления растения.
      </p>
    </section>
  </PageContainer>
);
