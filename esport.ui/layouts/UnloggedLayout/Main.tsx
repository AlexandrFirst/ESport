import React, { ReactNode } from "react";
import styles from "./main.module.scss";

import { TopPageLoader } from "@features/TopPageLoader/TopPageLoader";
import { SportHead, SportHeadProps } from "@features/SportHead/SportHead";
import { useMedia } from "@shared/lib/hooks/useMedia";

interface MainProps extends SportHeadProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
}

export const Main: React.FC<MainProps> = ({
  headProps,
  leftComponent,
  rightComponent,
}) => {
  const { isMobile } = useMedia();
  return (
    <>
      <SportHead {...headProps} />
      <TopPageLoader />
      <main className={styles.content}>
        {!isMobile && leftComponent}
        {rightComponent}
      </main>
    </>
  );
};
