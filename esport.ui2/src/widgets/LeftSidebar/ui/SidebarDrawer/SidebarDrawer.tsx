import React, { FC } from "react";
import { Sheet, SheetContent, SheetPosition } from "@/shared/ui";
import { SidebarMenu } from "../SidebarMenu/SidebarMenu";
import { SidebarContextProvider } from "../SidebarContext/SidebarContext";

interface SidebarDrawerProps {
  className?: string;
  position?: SheetPosition;
  open?: boolean;
  setOpen?: (p: boolean) => void;
}

export const SidebarDrawer: FC<SidebarDrawerProps> = ({
  className,
  position = "left",
  setOpen,
  open,
}) => {
  const handleClose = () => setOpen?.(false);
  const handleIsOpen = (p: boolean) => setOpen?.(p);

  return (
    <SidebarContextProvider
      context={{ isSidebarOpened: true, setIsSidebarOpened: handleIsOpen }}
    >
      <Sheet open={open}>
        <SheetContent
          onClickClose={handleClose}
          position={position}
          size={"sm"}
        >
          <SidebarMenu />
        </SheetContent>
      </Sheet>
    </SidebarContextProvider>
  );
};
