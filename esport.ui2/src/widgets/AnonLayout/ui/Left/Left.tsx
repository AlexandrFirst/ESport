import React, { FC, memo } from "react";
import styles from "./Left.module.css";

import cn from "classnames";

const Left: FC = () => {
  const bgRand = Math.random() > 0.49 ? styles.bgGirl : styles.bgBoy;

  return <section className={cn(styles.container, bgRand)} />;
};

export default memo(Left);
