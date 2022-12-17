import React from "react";
import styles from "./largeScreenSidebar.module.css";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { SidebarData } from "../SidebarData/SidebarData";
import cn from "classnames";
import { SportIconButton } from "@components/SportIconButton/SportIconButton";

interface LargeScreenSidebarProps {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (p: boolean) => void;
}

export const LargeScreenSidebar: React.FC<LargeScreenSidebarProps> = ({
  isSidebarOpened,
  setIsSidebarOpened,
}) => {
  const handleClickArrow = () => {
    setIsSidebarOpened(!isSidebarOpened);
  };

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
      <SidebarData isSidebarOpened={isSidebarOpened} />
    </div>
  );
};
