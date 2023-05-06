import React, { FC } from "react";
import styles from "./SimpleMenuItem.module.css";

import Link from "next/link";
import cn from "classnames";

import { ListItemButton } from "@/shared/ui";

import { IMenuItem } from "../../types/menu-item";

import { useSidebarContext } from "../SidebarContext/SidebarContext";

interface SimpleMenuItemProps {
  item: IMenuItem;
  onItemClick?: (item: IMenuItem) => void;
  currentPathname?: string;
}

export const SimpleMenuItem: FC<SimpleMenuItemProps> = ({
  item,
  currentPathname,
  onItemClick,
}) => {
  const { isSidebarOpened } = useSidebarContext();

  const selected = item.link && currentPathname === item.link;

  return (
    <ListItemButton
      className={cn(styles.list_item, { [styles.selected]: selected })}
      onClick={() => onItemClick?.(item)}
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
