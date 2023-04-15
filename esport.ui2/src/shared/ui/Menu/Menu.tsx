import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  FC,
  Fragment,
  ReactNode,
} from "react";
import styles from "./Menu.module.css";

import {
  Menu as HeadlessMenu,
  MenuProps as HeadlessMenuProps,
  Transition,
} from "@headlessui/react";
import cn from "classnames";

export type DropdownDirection =
  | "top left"
  | "top right"
  | "bottom left"
  | "bottom right";

const mapDirectionClass: Record<DropdownDirection, string> = {
  "bottom left": styles.optionsBottomLeft,
  "bottom right": styles.optionsBottomRight,
  "top right": styles.optionsTopRight,
  "top left": styles.optionsTopLeft,
};

interface MenuItem {
  key: string;
  disabled?: boolean;
  selected?: boolean;
  children: ReactNode;
}

interface MenuProps extends HeadlessMenuProps<ElementType> {
  menuButton?: ReactNode;
  list?: MenuItem[];
  direction?: DropdownDirection;
  bold?: boolean;
}

export const Menu: FC<MenuProps> = ({
  menuButton = "...",
  list,
  direction = "bottom right",
  bold = true,
  ...props
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HeadlessMenu
      {...props}
      as={"div"}
      className={cn(styles.wrapper, { [styles.bold]: bold })}
    >
      {({ open }) => (
        <>
          <HeadlessMenu.Button>{menuButton}</HeadlessMenu.Button>
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
              className={cn(styles.list, menuClasses)}
            >
              {list?.map((item) => (
                <HeadlessMenu.Item
                  key={item.key}
                  disabled={item.disabled}
                  as={Fragment}
                >
                  {({ disabled, active }) => (
                    <li
                      className={cn(styles.listItem, {
                        [styles.selected]: item.selected,
                      })}
                    >
                      {item.children}
                    </li>
                  )}
                </HeadlessMenu.Item>
              ))}
            </HeadlessMenu.Items>
          </Transition>

          {/*{open && (*/}
          {/* */}
          {/*)}*/}
        </>
      )}
    </HeadlessMenu>
  );
};
