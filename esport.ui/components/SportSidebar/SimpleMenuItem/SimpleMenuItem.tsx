import React from "react";
import styles from "./simpleMenuItem.module.css";

import { ListItemButton } from "@mui/material";

import { IMenuItem } from "@interfaces/menu-item";
import Link from "next/link";
import cn from "classnames";

interface SimpleMenuItemProps {
  item: IMenuItem;
  isSidebarOpened: boolean;
  onItemClick?: (item: IMenuItem) => void;
  currentPathname?: string;
}

export const SimpleMenuItem: React.FC<SimpleMenuItemProps> = ({
  item,
  isSidebarOpened,
  currentPathname,
  onItemClick,
}) => {
  const handleItemClick = (item: IMenuItem) => {
    onItemClick && onItemClick(item);
  };

  const selected = item.link && currentPathname === item.link;

  return (
    <ListItemButton
      className={cn(styles.list_item, { [styles.selected]: selected })}
      onClick={() => handleItemClick(item)}
    >
      {item.icon}
      <Link
        href={item.link ?? ""}
        className={cn(styles.link, { [styles.not_visible]: !isSidebarOpened })}
      >
        {item.title}
      </Link>
    </ListItemButton>
  );
};
