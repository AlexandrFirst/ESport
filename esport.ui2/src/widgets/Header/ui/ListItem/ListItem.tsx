import React, { FC, ReactNode } from "react";
import cn from "classnames";

interface ListItemProps {
  className?: string;
  children: ReactNode;
}

export const ListItem: FC<ListItemProps> = ({ className, children }) => {
  return <li className={cn("p-0 mr-6", className)}>{children}</li>;
};
