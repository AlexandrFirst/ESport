import React, { FC, ReactNode, useCallback } from "react";
import styles from "./Layout.module.css";

import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

import {
  leftSidebarActions,
  selectIsSidebarOpened,
  Sidebar,
} from "@/features/LeftSidebar";

interface LayoutProps {
  className?: string;
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ className, children }) => {
  const isSidebarOpened = useAppSelector(selectIsSidebarOpened) ?? false;
  const dispatch = useAppDispatch();

  const setIsSidebarOpened = useCallback(
    (isOpened: boolean) =>
      dispatch(leftSidebarActions.updateSidebarOpened(isOpened)),
    [dispatch]
  );

  const paddingClasses = cn({
    [styles.pl_compact]: !isSidebarOpened,
    [styles.pl_full]: isSidebarOpened,
  });
  const layoutClassName = cn(
    styles.layout,
    styles.width100,
    // isMobile ? "pl-layout-tablet" : paddingClasses
    paddingClasses
  );

  return (
    <>
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
