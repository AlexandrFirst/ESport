import React from "react";
import styles from "./mobileSportSidebar.module.scss";

import MenuIcon from "@mui/icons-material/Menu";

import { sidebarOpenedWidth } from "@shared/consts/layout";
import { SportSwipeableDrawer } from "@shared/ui/SportDrawer/SportSwipeableDrawer";
import { SportIconButton } from "@shared/ui/SportIconButton/SportIconButton";

import { SidebarData } from "../SidebarData/SidebarData";
import { useSidebarContext } from "../SidebarContext/SidebarContext";

interface MobileSportSidebarProps {}

export const MobileSportSidebar: React.FC<MobileSportSidebarProps> = () => {
  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();
  console.log("===isSidebarOpened===", isSidebarOpened);

  const handleSetIsSidebarOpened = () => {
    console.log("wiqjpijwqprqwjwqjrpwq");
    setIsSidebarOpened(true);
  };

  return (
    <>
      <SportIconButton
        onClick={handleSetIsSidebarOpened}
        className={styles.icon}
      >
        <MenuIcon />
      </SportIconButton>
      <SportSwipeableDrawer
        open={isSidebarOpened}
        onOpen={() => setIsSidebarOpened(true)}
        onClose={() => setIsSidebarOpened(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: sidebarOpenedWidth,
            zIndex: isSidebarOpened ? 1300 : 0,
          },
        }}
      >
        <SidebarData />
      </SportSwipeableDrawer>
    </>
  );
};

export default MobileSportSidebar;
