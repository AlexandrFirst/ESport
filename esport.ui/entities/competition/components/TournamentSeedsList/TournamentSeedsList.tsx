import React, { PropsWithChildren } from "react";
import styles from "./tournamentSeedsList.module.scss";
import cn from "classnames";

interface TournamentSeedsListProps extends PropsWithChildren {
  className?: string;
}

export const TournamentSeedsList: React.FC<TournamentSeedsListProps> = ({
  className,
  children,
}) => {
  return <div className={cn(styles.seed_list, className)}>{children}</div>;
};
