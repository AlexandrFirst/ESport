import React, { memo, PropsWithChildren } from "react";
import styles from "./Right.module.scss";

import cn from "classnames";

import { useMedia } from "@shared/lib/hooks/useMedia";

import { SportThemeSwitcher } from "@features/SportThemeSwitcher/SportThemeSwitcher";

import { Title } from "../Title/Title";
import { Subtitle } from "../Subtitle/Subtitle";

interface RightProps extends PropsWithChildren {
  title: string;
  subtitle: string;
}

export const Right: React.FC<RightProps> = memo(
  ({ title, subtitle, children }) => {
    const { isMobile, isTablet } = useMedia();
    return (
      <section
        className={cn(styles.section, {
          [styles.tablet]: isTablet,
          [styles.mobile]: isMobile,
        })}
      >
        <Title className={styles.title}>{title}</Title>
        <Subtitle className={styles.subtitle}>{subtitle}</Subtitle>
        <SportThemeSwitcher className={styles.theme_switcher} />
        {children}
      </section>
    );
  }
);
