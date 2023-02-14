import React, { PropsWithChildren, useCallback, useEffect } from "react";
import styles from "./mainLayout.module.css";
import cn from "classnames";

import { useMedia } from "@shared/lib/hooks/useMedia";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/useStore";

import { SportHead, SportHeadProps } from "@features/SportHead/SportHead";
import { TopPageLoader } from "@features/TopPageLoader";
import { SportSnackbar } from "@features/SportSnackbar";

import { SportSidebar } from "@widgets/SportSidebar/SportSidebar";
import { SportHeader } from "@widgets/SportHeader/SportHeader";

import { useMediaQuery } from "@shared/lib/hooks/useMediaQuery";

import { selectIsSidebarOpened, updateSidebarOpened } from "./mainLayout.slice";

type MainLayoutProps = PropsWithChildren &
  SportHeadProps & {
    className?: string;
    isSidebarOpened?: boolean;
  };

export const MainLayout: React.FC<MainLayoutProps> = ({
  headProps,
  className,
  // isSidebarOpened = false,
  children,
}) => {
  const { isMobile, tabletBreakPoint } = useMedia();
  const dispatch = useAppDispatch();

  const isLessBreakpoint = useMediaQuery(tabletBreakPoint);
  const isSidebarOpened = useAppSelector(selectIsSidebarOpened);

  const setIsSidebarOpened = useCallback(
    (isOpened: boolean) => dispatch(updateSidebarOpened(isOpened)),
    [dispatch]
  );

  const paddingClasses = cn({
    ["pl-compact"]: !isSidebarOpened,
    ["pl-full"]: isSidebarOpened,
  });
  const layoutClassName = cn(
    styles.layout,
    styles.width100,
    isMobile ? "pl-layout-tablet" : paddingClasses
  );

  // const onRouteChangeStart = useCallback(() => {
  //   setIsSidebarOpened(isLessBreakpoint);
  // }, []);
  //
  // const removeListener = () => {
  //   router.events.off("routeChangeStart", onRouteChangeStart);
  // };
  //
  // useEffect(() => {
  //   router.events.on("routeChangeStart", onRouteChangeStart);
  //
  //   return removeListener;
  // }, [onRouteChangeStart]);

  useEffect(() => {
    setIsSidebarOpened(isLessBreakpoint);
  }, [isLessBreakpoint, dispatch, setIsSidebarOpened]);

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
        <section className={cn(layoutClassName, styles.content, className)}>
          {children}
        </section>
      </main>
      <SportSnackbar />
    </>
  );
};
