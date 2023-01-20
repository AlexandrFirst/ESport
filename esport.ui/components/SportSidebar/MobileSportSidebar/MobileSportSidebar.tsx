import React from "react";
import styles from "./mobileSportSidebar.module.scss";

import MenuIcon from "@mui/icons-material/Menu";

import { sidebarOpenedWidth } from "@constants/layout";

import { SportIconButton } from "@components/SportIconButton/SportIconButton";
import { SidebarData } from "@components/SportSidebar/SidebarData/SidebarData";
import { useSidebarContext } from "@components/SportSidebar/SidebarContext/SidebarContext";
import { SportSwipeableDrawer } from "@components/SportDrawer/SportSwipeableDrawer";

interface MobileSportSidebarProps {}

export const MobileSportSidebar: React.FC<MobileSportSidebarProps> = () => {
  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  return (
    <>
      <SportIconButton
        onClick={() => setIsSidebarOpened(true)}
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
          },
        }}
      >
        <SidebarData />
      </SportSwipeableDrawer>
    </>
  );
};

export default MobileSportSidebar;
