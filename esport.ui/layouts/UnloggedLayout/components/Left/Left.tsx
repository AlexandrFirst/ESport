import React, { memo } from "react";
import styles from "./Left.module.scss";
import cn from "classnames";

import { useMedia } from "@shared/lib/hooks/useMedia";

export const Left: React.FC = memo(() => {
  const { isMobile } = useMedia();
  const bgRand = Math.random() > 0.49 ? styles.bgGirl : styles.bgBoy;

  return (
    <section
      className={cn(styles.container, bgRand, { ["hidden"]: isMobile })}
    />
  );
});
