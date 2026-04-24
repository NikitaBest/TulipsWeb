import type { PropsWithChildren } from "react";
import { useUiStore } from "@/app/providers/store/store";
import { AppHeader } from "@/widgets/app-header";
import styles from "./ChatLayout.module.css";

export const ChatLayout = ({ children }: PropsWithChildren) => {
  const setHistoryOpen = useUiStore((state) => state.setHistoryOpen);

  return (
    <div className={styles.layout}>
      <AppHeader title="База знаний" mode="menu" onMenuClick={() => setHistoryOpen(true)} inContainer={false} />
      {children}
    </div>
  );
};
