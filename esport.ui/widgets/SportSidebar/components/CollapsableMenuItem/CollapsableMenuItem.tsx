import React, { useLayoutEffect, useState } from "react";
import styles from "./collapsableMenuItem.module.scss";

import Link from "next/link";

import { List, ListItem, ListItemButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import cn from "classnames";

import { IMenuItem } from "@widgets/SportSidebar/types/menu-item";

import { useSidebarContext } from "../SidebarContext/SidebarContext";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/useStore";
import {
  pushOpenedSubItem,
  removeOpenedSubItem,
  selectOpenedSubItems,
} from "@layouts/MainLayout";

interface ICollapsableMenuItem extends IMenuItem {
  items?: IMenuItem[];
}

interface CollapsableMenuItemProps {
  item: ICollapsableMenuItem;
  onSubItemClick?: (subMenu: IMenuItem) => void;
  currentPathname?: string;
}

export const CollapsableMenuItem: React.FC<CollapsableMenuItemProps> = ({
  item,
  currentPathname,
  onSubItemClick,
}) => {
  const openedSubItems = useAppSelector(selectOpenedSubItems);
  const isThisSubItemOpened = openedSubItems.includes(item.link ?? "");
  // console.log("===openedSubItems===", openedSubItems);

  const [submenuOpen, setSubmenuOpen] = useState(isThisSubItemOpened);
  //TODO: think how remove dispatch
  const dispatch = useAppDispatch();

  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  const handleItemClick = () => {
    setIsSidebarOpened(true);
    !submenuOpen
      ? dispatch(pushOpenedSubItem(item.link ?? ""))
      : dispatch(removeOpenedSubItem(item.link ?? ""));
    setSubmenuOpen((prev) => !prev);
  };

  const handleSubItemClick = (subMenu: IMenuItem) => {
    onSubItemClick && onSubItemClick(subMenu);
  };

  const selected = item.items?.some(
    ({ link }) => link && link === currentPathname
  );

  useLayoutEffect(() => {
    if (selected) {
      dispatch(pushOpenedSubItem(item.link ?? ""));
      setSubmenuOpen(true);
    } else {
      dispatch(removeOpenedSubItem(item.link ?? ""));
    }
  }, [selected, dispatch]);

  return (
    <>
      <ListItemButton
        className={cn(styles.list_item, {
          [styles.selected]: selected && (!isSidebarOpened || !submenuOpen),
        })}
        onClick={handleItemClick}
      >
        {item.icon}
        <span
          className={cn(styles.title, {
            [styles.not_visible]: !isSidebarOpened,
          })}
        >
          {item.title}
        </span>
        <KeyboardArrowDownIcon
          className={cn(styles.arrow_icon, {
            [styles.not_visible_icon]: !isSidebarOpened,
            [styles.icon_submenu_opened]: submenuOpen,
          })}
        />
      </ListItemButton>
      <List
        className={cn(styles.inner_list, {
          [styles.inner_list_not_opened]: !submenuOpen || !isSidebarOpened,
          [styles.inner_list_opened]: submenuOpen && isSidebarOpened,
        })}
      >
        {item.items?.map((subMenu) => {
          const selected = subMenu.link && subMenu.link === currentPathname;
          return (
            <ListItem
              key={subMenu.link}
              className={cn(styles.inner_list_item, {
                [styles.inner_list_item_not_opened]:
                  !submenuOpen || !isSidebarOpened,
                [styles.inner_list_item_opened]: submenuOpen && isSidebarOpened,
              })}
            >
              <ListItemButton
                key={subMenu.title}
                className={cn(styles.inner_list_item_button, {
                  [styles.selected]: selected,
                })}
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
