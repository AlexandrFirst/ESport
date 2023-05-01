import React, { FC, ReactNode } from "react";
import styles from "./SeedsList.module.css";

interface SeedsListProps {
  className?: string;
  children?: ReactNode;
}

export const SeedsList: FC<SeedsListProps> = ({ className, children }) => {
  // margin: 0;
  // padding: 0;
  // display: flex;
  // flex-direction: column;
  // flex-flow: row wrap;
  // justify-content: center;
  // height: 100%;
  // list-style: none;
  return <div className={styles.wrapper}>SeedsList</div>;
};
