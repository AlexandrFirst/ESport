import React, { FC, PropsWithChildren } from "react";
import styles from "./tournamentRound.module.scss";

import cn from "classnames";

interface TournamentRoundProps extends PropsWithChildren {
  className?: string;
}

export const TournamentRound: FC<TournamentRoundProps> = ({
  className,
  children,
}) => {
  return <div className={cn(styles.round, className)}>{children}</div>;
};
