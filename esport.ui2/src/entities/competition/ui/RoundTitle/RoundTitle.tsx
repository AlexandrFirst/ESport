import React, { FC } from "react";
import styles from "./RoundTitle.module.css";

interface RoundTitleProps {
  className?: string;
}

export const RoundTitle: FC<RoundTitleProps> = ({ className }) => {
  //   styled.div`
  //   color: #8f8f8f;
  //   font-weight: 400;
  //   text-align: center;
  // `;
  return <div className={styles.wrapper}>RoundTitle</div>;
};
