import React from "react";
import styles from "./sportCard.module.scss";

import { Card, CardContent, CardProps } from "@mui/material";
import cn from "classnames";

interface SportCardProps extends CardProps {}

export const SportCard: React.FC<SportCardProps> = ({
  className,
  children,
  elevation = 6,
  ...props
}) => {
  return (
    <Card
      {...props}
      elevation={elevation}
      className={cn(styles.card, className)}
    >
      <CardContent>{children}</CardContent>
    </Card>
  );
};
