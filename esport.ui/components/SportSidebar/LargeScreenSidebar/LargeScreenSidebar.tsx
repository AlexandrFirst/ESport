import React from "react";

import { IconButton } from "@mui/material";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

import { SidebarData } from "../SidebarData/SidebarData";

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
      className={`${
        isSidebarOpened ? "w-72 p-5" : "w-20 p-2.5"
      } fixed pt-2.5 h-screen duration-500 bg-skin-main `}
    >
      <IconButton
        className="bg-skin-main hover:bg-skin-contrast absolute top-10 -right-2 text-skin-main transition-colors"
        onClick={handleClickArrow}
      >
        <KeyboardDoubleArrowLeftIcon
          className={`${
            isSidebarOpened ? "" : "rotate-180"
          } transition-transform`}
        />
      </IconButton>
      <SidebarData isSidebarOpened={isSidebarOpened} />
    </div>
  );
};
