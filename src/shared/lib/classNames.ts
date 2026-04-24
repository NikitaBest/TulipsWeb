export const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");
