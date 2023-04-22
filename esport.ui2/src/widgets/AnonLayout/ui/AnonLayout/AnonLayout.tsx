import { Head, HeadProps } from "@/features/Head";

import { useMedia } from "@/shared/lib";
import React, { FC, ReactNode } from "react";

import Left from "../Left/Left";
import Right, { RightProps } from "../Right/Right";
import styles from "./AnonLayout.module.css";

type AnonLayoutProps = RightProps &
  HeadProps & {
    children: ReactNode;
  };

const AnonLayout: FC<AnonLayoutProps> = ({ children, headProps, ...props }) => {
  const { isTablet } = useMedia();

  return (
    <>
      <Head {...headProps} />
      <main className={styles.content}>
        {!isTablet() && <Left />}
        <Right {...props}>{children}</Right>
      </main>
    </>
  );
};

export default AnonLayout;
