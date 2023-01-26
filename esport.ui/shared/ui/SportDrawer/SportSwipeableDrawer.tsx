import React from "react";
import styles from "./sportSwipeableDrawer.module.scss";

import { SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";

interface SportSwipeableDrawerProps extends SwipeableDrawerProps {}

export const SportSwipeableDrawer: React.FC<SportSwipeableDrawerProps> = ({
  variant = "temporary",
  children,
  ...props
}) => {
  return (
    <SwipeableDrawer
      {...props}
      variant={variant}
      classes={{ paper: styles.paper }}
    >
      {children}
    </SwipeableDrawer>
  );
};
