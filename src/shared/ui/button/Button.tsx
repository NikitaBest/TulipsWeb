import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { classNames } from "@/shared/lib/classNames";
import styles from "./Button.module.css";

type ButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export const Button = ({ children, className, ...props }: ButtonProps) => (
  <button className={classNames(styles.button, className)} {...props}>
    {children}
  </button>
);
