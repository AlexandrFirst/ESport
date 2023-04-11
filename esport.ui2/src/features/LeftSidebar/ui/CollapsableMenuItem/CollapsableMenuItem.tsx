import React, { FC, useLayoutEffect, useState } from "react";
import styles from "./CollapsableMenuItem.module.css";

import Link from "next/link";

import cn from "classnames";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { ListItemButton } from "@/shared/ui";

import { IMenuItem } from "../../types/menu-item";

import { leftSidebarActions } from "../../model/slices/leftSidebar.slice";
import { selectOpenedSubItems } from "../../model/selectors/selectOpenedSubItems/selectOpenedSubItems";

import { useSidebarContext } from "../SidebarContext/SidebarContext";

interface ICollapsableMenuItem extends IMenuItem {
  items?: IMenuItem[];
}

interface CollapsableMenuItemProps {
  item: ICollapsableMenuItem;
  onSubItemClick?: (subMenu: IMenuItem) => void;
  currentPathname?: string;
}

export const CollapsableMenuItem: FC<CollapsableMenuItemProps> = ({
  item,
  onSubItemClick,
  currentPathname,
}) => {
  const openedSubItems = useAppSelector(selectOpenedSubItems);
  const isThisSubItemOpened = openedSubItems.includes(item.link ?? "");

  const [submenuOpen, setSubmenuOpen] = useState(isThisSubItemOpened);
  //TODO: think how remove dispatch
  const dispatch = useAppDispatch();

  const { isSidebarOpened, setIsSidebarOpened } = useSidebarContext();

  const handleItemClick = () => {
    setIsSidebarOpened(true);
    !submenuOpen
      ? dispatch(leftSidebarActions.pushOpenedSubItem(item.link ?? ""))
      : dispatch(leftSidebarActions.removeOpenedSubItem(item.link ?? ""));
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
      dispatch(leftSidebarActions.pushOpenedSubItem(item.link ?? ""));
      setSubmenuOpen(true);
    } else {
      dispatch(leftSidebarActions.removeOpenedSubItem(item.link ?? ""));
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
        <ChevronDownIcon
          className={cn(styles.arrow_icon, {
            [styles.not_visible_icon]: !isSidebarOpened,
            [styles.icon_submenu_opened]: submenuOpen,
          })}
        />
      </ListItemButton>
      <ul
        className={cn(styles.inner_list, {
          [styles.inner_list_not_opened]: !submenuOpen || !isSidebarOpened,
          [styles.inner_list_opened]: submenuOpen && isSidebarOpened,
        })}
      >
        {item.items?.map((subMenu) => {
          const selected = subMenu.link && subMenu.link === currentPathname;
          return (
            <li
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
            </li>
          );
        })}
      </ul>
    </>
  );
};
