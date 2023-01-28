import React from "react";
import styles from "./sportCard.module.css";

import { Card, CardActionArea, CardContent, CardProps } from "@mui/material";
import cn from "classnames";

export interface SportCardProps extends CardProps {
  withAction?: boolean;
}

export const SportCard: React.FC<SportCardProps> = ({
  className,
  children,
  elevation = 6,
  withAction = false,
  ...props
}) => {
  return (
    <Card
      {...props}
      elevation={elevation}
      className={cn(styles.card, className)}
    >
      {withAction ? (
        <CardActionArea>
          <CardContent>{children}</CardContent>{" "}
        </CardActionArea>
      ) : (
        <CardContent>{children}</CardContent>
      )}
    </Card>
  );
};
