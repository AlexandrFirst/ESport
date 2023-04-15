import React, { FC, ReactNode } from "react";
import styles from "./AnonLayout.module.css";

import { useMedia } from "@/shared/lib";

import Left from "../Left/Left";
import Right, { RightProps } from "../Right/Right";

interface AnonLayoutProps extends RightProps {
  children: ReactNode;
}

const AnonLayout: FC<AnonLayoutProps> = ({ children, ...props }) => {
  const { isTablet } = useMedia();

  return (
    <>
      <main className={styles.content}>
        {!isTablet() && <Left />}
        <Right {...props}>{children}</Right>
      </main>
    </>
  );
};

export default AnonLayout;
