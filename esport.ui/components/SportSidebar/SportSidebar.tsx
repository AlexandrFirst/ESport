import React, { PropsWithChildren } from "react";

import { useMedia } from "@hooks/useMedia";

import { SidebarContextProvider } from "@components/SportSidebar/SidebarContext/SidebarContext";
import MobileSportSidebar from "@components/SportSidebar/MobileSportSidebar/MobileSportSidebar";
import { LargeScreenSidebar } from "@components/SportSidebar/LargeScreenSidebar/LargeScreenSidebar";

interface SportSidebarProps extends PropsWithChildren {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (p: boolean) => void;
}

export const SportSidebar: React.FC<SportSidebarProps> = ({
  isSidebarOpened,
  setIsSidebarOpened,
}) => {
  const { isMobile } = useMedia();

  return (
    <SidebarContextProvider
      setIsSidebarOpened={setIsSidebarOpened}
      isSidebarOpened={isSidebarOpened}
    >
      {isMobile ? <MobileSportSidebar /> : <LargeScreenSidebar />}
    </SidebarContextProvider>
  );
};
