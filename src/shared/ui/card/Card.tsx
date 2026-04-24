import type { PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./Card.module.css";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export const Card = ({ children, className }: CardProps) => {
  return <section className={classNames(styles.card, className)}>{children}</section>;
};
