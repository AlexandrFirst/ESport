import React, { FC, ReactNode } from "react";

interface SeedTimeProps {
  children: ReactNode;
}

export const SeedTime: FC<SeedTimeProps> = ({ children }) => {
  return <div>{children}</div>;
};
