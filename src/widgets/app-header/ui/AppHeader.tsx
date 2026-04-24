import { Link, useNavigate } from "react-router-dom";
import { useUiStore } from "@/app/providers/store/store";
import { routes } from "@/shared/config/routes";
import { classNames } from "@/shared/lib/classNames";
import styles from "./AppHeader.module.css";

type HeaderMode = "menu" | "back";

type AppHeaderProps = {
  title: string;
  mode?: HeaderMode;
  onMenuClick?: () => void;
  inContainer?: boolean;
};

export const AppHeader = ({ title, mode = "back", onMenuClick, inContainer = true }: AppHeaderProps) => {
  const navigate = useNavigate();
  const setSelectedChatId = useUiStore((state) => state.setSelectedChatId);

  return (
    <header
      className={classNames(styles.header, inContainer && styles.inContainer, !inContainer && styles.standalone)}
    >
      {mode === "menu" ? (
        <button
          type="button"
          className={classNames(styles.sideButton, styles.menuButton)}
          aria-label="Открыть историю чатов"
          onClick={onMenuClick}
        >
          ☰
        </button>
      ) : (
        <button type="button" className={styles.sideButton} aria-label="Назад" onClick={() => navigate(-1)}>
          ←
        </button>
      )}

      <Link className={styles.title} to={routes.knowledgeBase}>
        {title}
      </Link>

      <button
        type="button"
        className={classNames(styles.sideButton, styles.newChatButton)}
        aria-label="Создать новый чат"
        onClick={() => {
          setSelectedChatId(null);
          navigate(routes.chat);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.newChatIcon}>
          <path
            d="M6.1 5.9h11.8a2.6 2.6 0 0 1 2.6 2.6v7.4a2.6 2.6 0 0 1-2.6 2.6h-7l-3.5 2.7c-.5.3-1 0-1-.5v-2.2a2.6 2.6 0 0 1-2-2.6V8.5a2.6 2.6 0 0 1 2.7-2.6z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.1 9.4v5.2M9.5 12h5.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </header>
  );
};
