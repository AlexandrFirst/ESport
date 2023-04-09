import React from "react";
import styles from "./sportCard.module.css";

import { Card, CardActionArea, CardContent, CardProps } from "@mui/material";
import cn from "classnames";

export interface SportCardProps extends CardProps {
  withAction?: boolean;
  cardContentClassName?: string;
}

export const SportCard: React.FC<SportCardProps> = ({
  className,
  children,
  elevation = 6,
  withAction = false,
  cardContentClassName,
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
          <CardContent className={cardContentClassName}>{children}</CardContent>{" "}
        </CardActionArea>
      ) : (
        <CardContent className={cardContentClassName}>{children}</CardContent>
      )}
    </Card>
  );
};
