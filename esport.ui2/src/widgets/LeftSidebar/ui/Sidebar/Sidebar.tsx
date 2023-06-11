import React, { FC } from "react";

import { BrowserView, MobileView } from "@/shared/ui";

import { SidebarContextProvider } from "../SidebarContext/SidebarContext";
import { LargeScreenSidebar } from "../LargeScreenSidebar/LargeScreenSidebar";
import { SidebarDrawer } from "../..";

interface SidebarProps {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (p: boolean) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  setIsSidebarOpened,
  isSidebarOpened,
}) => {
  return (
    <SidebarContextProvider context={{ isSidebarOpened, setIsSidebarOpened }}>
      <MobileView>
        <SidebarDrawer setOpen={setIsSidebarOpened} open={isSidebarOpened} />
      </MobileView>
      <BrowserView>
        <LargeScreenSidebar />
      </BrowserView>
    </SidebarContextProvider>
  );
};
