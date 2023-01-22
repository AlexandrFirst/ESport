import React from "react";
import styles from "./largeScreenSidebar.module.scss";

import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import cn from "classnames";

import { SportIconButton } from "@shared/ui/SportIconButton/SportIconButton";

import { SidebarData } from "../SidebarData/SidebarData";
import { useSidebarContext } from "../SidebarContext/SidebarContext";

interface LargeScreenSidebarProps {}

export const LargeScreenSidebar: React.FC<LargeScreenSidebarProps> = () => {
  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  const handleClickArrow = () => setIsSidebarOpened(!isSidebarOpened);

  return (
    <div
      className={cn(styles.wrapper, {
        [styles.opened]: isSidebarOpened,
        [styles.closed]: !isSidebarOpened,
      })}
    >
      <SportIconButton className={styles.iconBtn} onClick={handleClickArrow}>
        <KeyboardDoubleArrowLeftIcon
          className={cn(styles.arrow, {
            [styles.arrow_closed]: !isSidebarOpened,
          })}
        />
      </SportIconButton>
      <SidebarData />
    </div>
  );
};
