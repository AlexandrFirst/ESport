import React from "react";
import styles from "./simpleMenuItem.module.scss";

import { ListItemButton } from "@mui/material";

import Link from "next/link";
import cn from "classnames";

import { IMenuItem } from "@widgets/SportSidebar/types/menu-item";

import { useSidebarContext } from "../SidebarContext/SidebarContext";

interface SimpleMenuItemProps {
  item: IMenuItem;
  onItemClick?: (item: IMenuItem) => void;
  currentPathname?: string;
}

export const SimpleMenuItem: React.FC<SimpleMenuItemProps> = ({
  item,
  currentPathname,
  onItemClick,
}) => {
  const { isSidebarOpened } = useSidebarContext();

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
