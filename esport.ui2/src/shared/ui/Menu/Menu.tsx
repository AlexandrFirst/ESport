import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  FC,
  Fragment,
  ReactNode,
} from "react";
import {
  Menu as HeadlessMenu,
  MenuProps as HeadlessMenuProps,
} from "@headlessui/react";

interface MenuItem {
  key: string;
  disabled?: boolean;
  selected?: boolean;
  children: ReactNode;
}

interface MenuProps extends HeadlessMenuProps<ElementType> {
  menuButton?: ReactNode;
  list?: MenuItem[];
}

export const Menu: FC<MenuProps> = ({ menuButton = "...", list, ...props }) => {
  return (
    <HeadlessMenu {...props}>
      <HeadlessMenu.Button>{menuButton}</HeadlessMenu.Button>
      <HeadlessMenu.Items>
        {list?.map((item) => (
          <HeadlessMenu.Item key={item.key} disabled={item.disabled} />
        ))}
      </HeadlessMenu.Items>
    </HeadlessMenu>
  );
};
