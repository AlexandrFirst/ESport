import React, { PropsWithChildren, useEffect } from "react";
import styles from "./mainLayout.module.scss";

import cn from "classnames";

import { useMedia } from "@shared/lib/hooks/useMedia";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/useStore";

import { TopPageLoader } from "@features/TopPageLoader/TopPageLoader";
import { SportHead, SportHeadProps } from "@features/SportHead/SportHead";

import { SportSidebar } from "@widgets/SportSidebar/SportSidebar";
import { SportHeader } from "@widgets/SportHeader/SportHeader";

import { useMediaQuery } from "@shared/lib/hooks/useMediaQuery";

import { updateSidebarOpened } from "./mainLayout.slice";

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
