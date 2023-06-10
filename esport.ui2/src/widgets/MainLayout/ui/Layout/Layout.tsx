import React, { FC, ReactNode, useCallback, useEffect } from "react";
import styles from "./Layout.module.css";

import cn from "classnames";

import { Head, HeadProps } from "@/features/Head";
import { useAppSelector, useUserDevice } from "@/shared/lib";

import { Header } from "@/widgets/Header";

import {
  selectIsSidebarOpened,
  Sidebar,
  useLeftSidebarActions,
} from "@/widgets/LeftSidebar";

export interface LayoutProps extends HeadProps {
  className?: string;
  children: ReactNode;
  withFooter?: boolean;
  withPaddingRight?: boolean;
  withLeftSidebar?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  className,
  headProps,
  withFooter,
  withPaddingRight = true,
  withLeftSidebar = true,
  children,
}) => {
  const { isMobile } = useUserDevice();
  const { updateSidebarOpened } = useLeftSidebarActions();

  const isSidebarOpened =
    useAppSelector(selectIsSidebarOpened) ?? withLeftSidebar;

  const setIsSidebarOpened = useCallback(
    (isOpened: boolean) => updateSidebarOpened(isOpened),
    [updateSidebarOpened]
  );

  const paddingClasses = isMobile
    ? styles.pl_mobile
    : cn({
        [styles.pl_compact]: !isSidebarOpened,
        [styles.pl_full]: isSidebarOpened,
      });
  const layoutClassName = cn(styles.layout, styles.width100, paddingClasses, {
    [styles.pr]: withPaddingRight,
  });

  useEffect(() => {
    updateSidebarOpened(withLeftSidebar);
  }, [updateSidebarOpened, withLeftSidebar]);

  return (
    <>
      <Head {...headProps} />
      <Header withLogoAndMenu={!withLeftSidebar} />
      <main>
        {withLeftSidebar && (
          <Sidebar
            isSidebarOpened={isSidebarOpened}
            setIsSidebarOpened={setIsSidebarOpened}
          />
        )}
        <section
          className={cn(layoutClassName, styles.content, className, {
            [styles.withFooter]: withFooter,
          })}
        >
          {children}
        </section>
      </main>
    </>
  );
};
