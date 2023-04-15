import React, { FC, memo, ReactNode } from "react";
import styles from "./ListItem.module.css";

interface ListItemProps {
  children: ReactNode;
}

export const ListItem: FC<ListItemProps> = ({ children }) => {
  return <li className="p-0 mr-6">{children}</li>;
};
