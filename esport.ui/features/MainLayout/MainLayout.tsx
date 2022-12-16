import React, { PropsWithChildren, useState } from "react";
import styles from "./mainLayout.module.css";

import cn from "classnames";

import { useMedia } from "@hooks/useMedia";
import { TopPageLoader } from "@shared/TopPageLoader/TopPageLoader";
import { SportHead, SportHeadProps } from "@shared/SportHead/SportHead";

import { SportSidebar } from "@components/SportSidebar/SportSidebar";
import { SportHeader } from "@components/SportHeader/SportHeader";

type MainLayoutProps = PropsWithChildren & SportHeadProps & {};

export const MainLayout: React.FC<MainLayoutProps> = ({
  headProps,
  children,
}) => {
  const { isMobile } = useMedia();

  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  const paddingClasses = cn({
    ["pl-compact"]: !isSidebarOpened,
    ["pl-full"]: isSidebarOpened,
  });
  const layoutClassName = cn(
    `bg-skin-main transition-all duration-500`,
    styles.width100,
    isMobile ? "pl-layout-tablet" : paddingClasses
  );

  return (
    <>
      <SportHead {...headProps} />
      <main className={styles.main}>
        <SportHeader className={layoutClassName} />
        <TopPageLoader />
        <SportSidebar
          isSidebarOpened={isSidebarOpened}
          setIsSidebarOpened={setIsSidebarOpened}
        />
        <section className={cn(layoutClassName, styles.ptHeader)}>
          {children}
        </section>
      </main>
    </>
  );
};
