import React, { FC, useCallback, useEffect } from "react";
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
  const handleClose = useCallback(() => setOpen?.(false), []);
  const handleIsOpen = useCallback((p: boolean) => setOpen?.(p), []);

  useEffect(() => {
    return () => handleClose();
  }, [handleClose]);

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
