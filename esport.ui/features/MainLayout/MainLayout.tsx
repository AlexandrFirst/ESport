import React, { PropsWithChildren, useEffect } from "react";
import styles from "./mainLayout.module.css";

import cn from "classnames";

import { useMedia } from "@hooks/useMedia";

import { TopPageLoader } from "@features/TopPageLoader/TopPageLoader";
import { SportHead, SportHeadProps } from "@features/SportHead/SportHead";

import { SportSidebar } from "@components/SportSidebar/SportSidebar";
import { SportHeader } from "@components/SportHeader/SportHeader";

import { useAppDispatch, useAppSelector } from "@storage/hooks/useStore";
import { updateSidebarOpened } from "@storage/slices/layout";
import { useMediaQuery } from "@hooks/useMediaQuery";

type MainLayoutProps = PropsWithChildren & SportHeadProps & {};

export const MainLayout: React.FC<MainLayoutProps> = ({
  headProps,
  children,
}) => {
  const { isMobile, tabletBreakPoint } = useMedia();
  const dispatch = useAppDispatch();

  const isLessBreakpoint = useMediaQuery(tabletBreakPoint);

  const isSidebarOpened = useAppSelector(
    ({ layout }) => layout.isSidebarOpened
  );
  const setIsSidebarOpened = (isOpened: boolean) =>
    dispatch(updateSidebarOpened(isOpened));

  const paddingClasses = cn({
    ["pl-compact"]: !isSidebarOpened,
    ["pl-full"]: isSidebarOpened,
  });
  const layoutClassName = cn(
    styles.layout,
    styles.width100,
    isMobile ? "pl-layout-tablet" : paddingClasses
  );

  useEffect(() => {
    setIsSidebarOpened(isLessBreakpoint);
  }, [isLessBreakpoint]);

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
