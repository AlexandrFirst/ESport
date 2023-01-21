import React, { ReactNode } from "react";
import styles from "./sportMenu.module.scss";

import { Menu, MenuItem, MenuProps } from "@mui/material";
import cn from "classnames";

export interface ISportMenuItem {
  item: ReactNode;
  className?: string;
  selected?: boolean;
}

interface SportMenuProps extends MenuProps {
  dataList?: ISportMenuItem[];
}

export const SportMenu: React.FC<SportMenuProps> = ({
  dataList,
  className,
  ...props
}) => {
  return (
    <Menu
      {...props}
      classes={{
        paper: styles.paper,
        list: styles.text,
      }}
    >
      {dataList?.map(({ item, className, selected }, index) => (
        <MenuItem
          key={index}
          className={cn(styles.menu_item, className, {
            [styles.menu_item_selected]: selected,
          })}
        >
          {item}
        </MenuItem>
      ))}
    </Menu>
  );
};
