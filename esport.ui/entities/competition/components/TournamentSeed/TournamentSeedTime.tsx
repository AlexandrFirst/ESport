import { FC, PropsWithChildren } from "react";
import styles from "./tournamentSeed.module.scss";

interface TournamentSeedTimeProps extends PropsWithChildren {}

export const TournamentSeedTime: FC<TournamentSeedTimeProps> = ({
  children,
}) => {
  return <div className={styles.seed_time}>{children}</div>;
};