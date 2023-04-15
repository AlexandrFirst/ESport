import React, { FC, memo, ReactNode } from "react";
import styles from "./Right.module.css";

import cn from "classnames";

import { useMedia } from "@/shared/lib";
import { Title, SubTitle } from "@/shared/ui";

import { ThemeSwitcher } from "@/features/ThemeSwitcher";

export interface RightProps {
  title?: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
}

const Right: FC<RightProps> = ({ className, children, subtitle, title }) => {
  const { isTablet, isMobile } = useMedia();
  return (
    <section
      className={cn(styles.section, className, {
        [styles.tablet]: isTablet(),
        [styles.mobile]: isMobile(),
      })}
    >
      {title && <Title className={styles.title}>{title}</Title>}
      {subtitle && <SubTitle className={styles.subtitle}>{subtitle}</SubTitle>}
      <ThemeSwitcher className={styles.theme_switcher} />
      {children}
    </section>
  );
};

export default memo(Right);
