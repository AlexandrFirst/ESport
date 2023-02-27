import React, { FC, PropsWithChildren } from "react";
import styles from "./tournamentSeed.module.scss";

import { motion } from "framer-motion";

interface TournamentSeedTeamProps extends PropsWithChildren {}

//TODO: remake it to draggable component
export const TournamentSeedTeam: FC<TournamentSeedTeamProps> = ({
  children,
}) => {
  return (
    <motion.div drag className={styles.seed_team}>
      {/*<SportAutocomplete*/}
      {/*  name={"qweqwe"}*/}
      {/*  displayKey={"name"}*/}
      {/*  options={[*/}
      {/*    {*/}
      {/*      id: "1",*/}
      {/*      name: "qweqwe",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      id: "2",*/}
      {/*      name: "qweqwe",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      id: "3",*/}
      {/*      name: "qweqwe",*/}
      {/*    },*/}
      {/*    {*/}
      {/*      id: "4",*/}
      {/*      name: "qweqwe",*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
      {children}
    </motion.div>
  );
};
