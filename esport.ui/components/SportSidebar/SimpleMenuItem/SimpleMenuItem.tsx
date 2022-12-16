import React from "react";
import { ListItemButton } from "@mui/material";

import { IMenuItem } from "@interfaces/menu-item";
import Link from "next/link";

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
  const selectedClassName = "bg-skin-contrast";

  return (
    <ListItemButton
      className={`rounded-md w-full hover:bg-skin-subsidiary ${
        selected && selectedClassName
      }`}
      onClick={() => handleItemClick(item)}
    >
      {item.icon}
      <Link
        href={item.link ?? ""}
        className={`${
          !isSidebarOpened && "hidden"
        } origin-left duration-200 text-skin-main`}
      >
        {item.title}
      </Link>
    </ListItemButton>
  );
};
