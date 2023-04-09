import React, { FC, PropsWithChildren } from "react";
import styles from "./tournamentSeed.module.scss";

import { motion } from "framer-motion";

interface TournamentSeedTeamProps extends PropsWithChildren {}

//TODO: remake it to draggable component
export const TournamentRoundFight: FC<TournamentSeedTeamProps> = ({
  children,
}) => {
  return (
    <motion.div className={styles.seed_round_fight}>{children}</motion.div>
  );
};
