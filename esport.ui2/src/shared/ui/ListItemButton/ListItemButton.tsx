import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

import styles from "./ListItemButton.module.css";

import cn from "classnames";

interface ListItemButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const ListItemButton: FC<ListItemButtonProps> = ({
  className,
  ...props
}) => {
  return <button {...props} className={cn(styles.wrapper, className)}></button>;
};
