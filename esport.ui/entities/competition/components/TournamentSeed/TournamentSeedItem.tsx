import React, { FC, PropsWithChildren } from "react";
import styles from "./tournamentSeed.module.scss";

interface TournamentSeedItemProps extends PropsWithChildren {}

export const TournamentSeedItem: FC<TournamentSeedItemProps> = ({
  children,
}) => {
  return <div className={styles.seed_item}>{children}</div>;
};
