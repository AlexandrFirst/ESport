import React, { FC, ReactNode, useCallback } from "react";
import styles from "./Layout.module.css";

import cn from "classnames";

import { Head, HeadProps } from "@/features/Head";
import { useAppDispatch, useAppSelector, useUserDevice } from "@/shared/lib";

import { Header } from "@/widgets/Header";

import {
  leftSidebarActions,
  selectIsSidebarOpened,
  Sidebar,
} from "@/widgets/LeftSidebar";

interface LayoutProps extends HeadProps {
  className?: string;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ className, headProps, children }) => {
  const { isMobile } = useUserDevice();

  const isSidebarOpened = useAppSelector(selectIsSidebarOpened) ?? false;
  const dispatch = useAppDispatch();

  const setIsSidebarOpened = useCallback(
    (isOpened: boolean) =>
      dispatch(leftSidebarActions.updateSidebarOpened(isOpened)),
    [dispatch]
  );

  const paddingClasses = isMobile
    ? styles.pl_mobile
    : cn({
        [styles.pl_compact]: !isSidebarOpened,
        [styles.pl_full]: isSidebarOpened,
      });
  const layoutClassName = cn(styles.layout, styles.width100, paddingClasses);

  return (
    <>
      <Head {...headProps} />
      <Header />
      <main>
        <Sidebar
          isSidebarOpened={isSidebarOpened}
          setIsSidebarOpened={setIsSidebarOpened}
        />
        <section className={cn(layoutClassName, styles.content, className)}>
          {children}
        </section>
      </main>
    </>
  );
};
