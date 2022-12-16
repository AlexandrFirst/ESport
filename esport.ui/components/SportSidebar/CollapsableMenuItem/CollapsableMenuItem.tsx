import React, { useState } from "react";
import { List, ListItem, ListItemButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { IMenuItem } from "@interfaces/menu-item";
import Link from "next/link";

interface ICollapsableMenuItem extends IMenuItem {
  items?: IMenuItem[];
}

interface CollapsableMenuItemProps {
  item: ICollapsableMenuItem;
  isSidebarOpened: boolean;
  onSubItemClick?: (subMenu: IMenuItem) => void;
  currentPathname?: string;
}

export const CollapsableMenuItem: React.FC<CollapsableMenuItemProps> = ({
  item,
  isSidebarOpened,
  currentPathname,
  onSubItemClick,
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubItemClick = (subMenu: IMenuItem) => {
    onSubItemClick && onSubItemClick(subMenu);
  };

  const selected = item.items?.some(
    ({ link }) => link && link === currentPathname
  );
  const selectedClassName = "bg-skin-contrast";

  return (
    <>
      <ListItemButton
        className={`rounded-md w-full hover:bg-skin-subsidiary  ${
          selected && !isSidebarOpened && selectedClassName
        }`}
        onClick={() => setSubmenuOpen((prev) => !prev)}
      >
        {item.icon}
        <span
          className={`${
            !isSidebarOpened && "hidden"
          } origin-left duration-200 text-skin-main`}
        >
          {item.title}
        </span>
        <KeyboardArrowDownIcon
          className={`ml-auto ${!isSidebarOpened && "scale-0"} transition-all ${
            submenuOpen && "rotate-180"
          }`}
        />
      </ListItemButton>
      <List
        className={`ml-11 w-full ${
          !submenuOpen || !isSidebarOpened ? "h-0 p-0" : "h-fit"
        } transition-all`}
      >
        {item.items?.map((subMenu) => {
          const selected = subMenu.link && subMenu.link === currentPathname;
          return (
            <ListItem
              key={subMenu.link}
              className={`border-l-2 p-0 pb-2 border-text-main w-9/12 ${
                !submenuOpen || !isSidebarOpened ? "opacity-0" : "opacity-1"
              }`}
            >
              <ListItemButton
                key={subMenu.title}
                className={`hover:bg-skin-subsidiary transition-all rounded-md w-full ${
                  selected && selectedClassName
                }`}
                onClick={() => handleSubItemClick(subMenu)}
              >
                <Link href={subMenu.link ?? ""}>{subMenu.title}</Link>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};
