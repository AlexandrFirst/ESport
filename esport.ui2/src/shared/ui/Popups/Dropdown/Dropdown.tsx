import React, { FC, memo, ReactNode } from "react";
import styles from "./Dropdown.module.css";
import popupStyles from "../styles/popup.module.css";

import { mapDirectionClass } from "../styles/consts";

import cn from "classnames";

import { Menu as HeadlessMenu, Transition } from "@headlessui/react";

import { DropdownDirection } from "../types/dropdownDirection";

interface DropdownProps {
  className?: string;
  direction?: DropdownDirection;
  trigger: ReactNode;
}

const Dropdown: FC<DropdownProps> = ({
  className,
  direction = "bottom left",
  trigger,
  ...props
}) => {
  const menuClasses = [mapDirectionClass[direction]];

  return (
    <HeadlessMenu {...props} as={"div"} className={cn(popupStyles.popup)}>
      {({ close }) => (
        <>
          <HeadlessMenu.Button>{trigger}</HeadlessMenu.Button>
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
              {/*{list?.map(({ itemPadding = ItemPadding.Medium, ...item }) => (*/}
              {/*  <HeadlessMenu.Item*/}
              {/*    key={item.key}*/}
              {/*    disabled={item.disabled}*/}
              {/*    as={Fragment}*/}
              {/*  >*/}
              {/*    {({ disabled, active }) => (*/}
              {/*      <li*/}
              {/*        className={cn(styles.listItem, styles[itemPadding], {*/}
              {/*          [styles.selected]: item.selected,*/}
              {/*        })}*/}
              {/*        onClick={close}*/}
              {/*      >*/}
              {/*        {item.children(close)}*/}
              {/*      </li>*/}
              {/*    )}*/}
              {/*  </HeadlessMenu.Item>*/}
              {/*))}*/}
            </HeadlessMenu.Items>
          </Transition>
        </>
      )}
    </HeadlessMenu>
  );
};

export default memo(Dropdown);
