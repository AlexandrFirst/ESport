import React, { ElementType, FC, Fragment, ReactNode } from "react";
import styles from "./Menu.module.css";
import popupStyles from "../styles/popup.module.css";

import cn from "classnames";

import {
  Menu as HeadlessMenu,
  MenuProps as HeadlessMenuProps,
  Transition,
} from "@headlessui/react";

import { mapDirectionClass } from "../styles/consts";
import { DropdownDirection } from "../types/dropdownDirection";

export enum ItemPadding {
  None = "none",
  Small = "sm",
  Medium = "md",
}

export type MenuList = MenuItem[];

export interface MenuItem {
  key: string;
  disabled?: boolean;
  selected?: boolean;
  children: ReactNode;
  itemPadding?: ItemPadding;
  className?: string;
  onClick?: () => void;
}

interface MenuProps extends HeadlessMenuProps<ElementType> {
  menuButton?: ReactNode;
  list?: MenuItem[];
  direction?: DropdownDirection;
  bold?: boolean;
  buttonClassName?: string;
  fullWidthList?: boolean;
}

export const Menu: FC<MenuProps> = ({
  menuButton = "...",
  list,
  direction = "bottom right",
  bold = true,
  buttonClassName,
  fullWidthList,
  ...props
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HeadlessMenu
      {...props}
      as={"div"}
      className={cn(popupStyles.popup, { [styles.bold]: bold })}
    >
      {({ close }) => (
        <>
          <HeadlessMenu.Button className={buttonClassName}>
            {menuButton}
          </HeadlessMenu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <HeadlessMenu.Items
              as={"ul"}
              className={cn(styles.list, menuClasses, {
                [styles.fullwidth]: fullWidthList,
              })}
            >
              {list?.map(({ itemPadding = ItemPadding.Medium, ...item }) => (
                <HeadlessMenu.Item
                  key={item.key}
                  disabled={item.disabled}
                  as={Fragment}
                >
                  {({ disabled, active }) => (
                    <li
                      className={cn(
                        styles.listItem,
                        item.className,
                        styles[itemPadding],
                        {
                          [styles.selected]: item.selected,
                        }
                      )}
                      onClick={() => {
                        item.onClick?.();
                        close();
                      }}
                    >
                      {item.children}
                    </li>
                  )}
                </HeadlessMenu.Item>
              ))}
            </HeadlessMenu.Items>
          </Transition>
        </>
      )}
    </HeadlessMenu>
  );
};