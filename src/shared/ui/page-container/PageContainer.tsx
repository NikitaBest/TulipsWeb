import type { PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./PageContainer.module.css";

type PageContainerProps = PropsWithChildren<{ className?: string }>;

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return <main className={classNames(styles.container, className)}>{children}</main>;
};
