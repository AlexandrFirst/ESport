import React from "react";
import styles from "./largeScreenSidebar.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { SidebarData } from "../SidebarData/SidebarData";
import cn from "classnames";
import { SportIconButton } from "@components/SportIconButton/SportIconButton";
import { useSidebarContext } from "@components/SportSidebar/SidebarContext/SidebarContext";

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
          className={`${
            isSidebarOpened ? "" : "rotate-180"
          } transition-transform`}
        />
      </SportIconButton>
      <SidebarData />
    </div>
  );
};
