import React, { FC, memo } from "react";
import styles from "./Bracket.module.css";

interface BracketProps {
  className?: string;
}

const Bracket: FC<BracketProps> = ({ className }) => {
  // display: flex;
  // flex-direction: row;
  // @media (max-width: ${props.mobileBreakpoint}px) {
  //   flex-direction: column;
  // }
  return <div className={styles.wrapper}>Bracket</div>;
};

export default memo(Bracket);
