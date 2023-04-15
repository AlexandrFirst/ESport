import React, { FC } from "react";
import styles from "./LargeScreenSidebar.module.css";

import cn from "classnames";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

import { IconButton } from "@/shared/ui";

import { useSidebarContext } from "../SidebarContext/SidebarContext";
import { SidebarMenu } from "../SidebarMenu/SidebarMenu";

interface LargeScreenSidebarProps {
  className?: string;
}

export const LargeScreenSidebar: FC<LargeScreenSidebarProps> = ({
  className,
}) => {
  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  const wrapperClasses = {
    [styles.opened]: isSidebarOpened,
    [styles.closed]: !isSidebarOpened,
  };

  const handleClickArrow = () => setIsSidebarOpened(!isSidebarOpened);

  return (
    <aside className={cn(styles.wrapper, className, wrapperClasses)}>
      <IconButton
        Svg={ChevronDoubleRightIcon}
        className={styles.iconBtn}
        onClick={handleClickArrow}
        svgClassName={cn(styles.arrow, {
          [styles.arrow_closed]: !isSidebarOpened,
        })}
      />
      <SidebarMenu />
    </aside>
  );
};
