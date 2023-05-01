import React, { FC, ReactNode } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectDevice } from "@/shared/model";

interface BrowserViewProps {
  children?: ReactNode;
}

export const BrowserView: FC<BrowserViewProps> = ({ children }) => {
  const { isDesktop } = useAppSelector(selectDevice);
  if (!isDesktop) return null;

  return <>{children}</>;
};
