import React, { PropsWithChildren } from "react";
import styles from "./categoryTitle.module.css";

interface CategoryTitleProps extends PropsWithChildren {}

export const CategoryTitle: React.FC<CategoryTitleProps> = ({ children }) => {
  return <h1 className={styles.title}>{children}</h1>;
};
