import React, { FC, ReactNode } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectDevice } from "@/shared/model";

interface MobileViewProps {
  children?: ReactNode;
}

export const MobileView: FC<MobileViewProps> = ({ children }) => {
  const { isMobile } = useAppSelector(selectDevice);
  if (!isMobile) return null;

  return <>{children}</>;
};
