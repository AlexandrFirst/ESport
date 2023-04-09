import React, { FC, PropsWithChildren } from "react";
import styles from "./tournamentSeed.module.scss";

interface TournamentRoundItemProps extends PropsWithChildren {}

export const TournamentRoundItem: FC<TournamentRoundItemProps> = ({
  children,
}) => {
  return <div className={styles.seed_item}>{children}</div>;
};
