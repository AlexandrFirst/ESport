import Head from "next/head";

import React, { PropsWithChildren, useState } from "react";
import styles from "./mainLayout.module.css";

import cn from "classnames";

import { useAppThemeContext } from "@shared/AppThemeProvider/useAppThemeContext";

import { SportSidebar } from "@components/SportSidebar/SportSidebar";
import { SportHeader } from "@components/SportHeader/SportHeader";

import { useMedia } from "@hooks/useMedia";
import { TopPageLoader } from "@shared/TopPageLoader/TopPageLoader";

interface MainLayoutProps extends PropsWithChildren {
  title?: string;
  keywords?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  keywords,
  children,
}) => {
  const { isMobile } = useMedia();
  const { currentTheme } = useAppThemeContext();

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
      <Head>
        <title>{title ?? "E - Sport"}</title>
        <meta
          name="keywords"
          content={`e-sport sport organization ${keywords}`.trim()}
        />
      </Head>

      <main
        className={cn("h-screen flex flex-row justify-start", currentTheme)}
      >
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
