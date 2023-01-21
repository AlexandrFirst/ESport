import React, { PropsWithChildren } from "react";
import styles from "./sportFooter.module.css";

import { Grid } from "@mui/material";
import cn from "classnames";

interface SportFooterProps extends PropsWithChildren {
  className?: string;
}

//TODO: works like shit because of width
export const SportFooter: React.FC<SportFooterProps> = ({
  className,
  children,
}) => {
  return <Grid className={cn(styles.wrapper, className)}>{children}</Grid>;
};
