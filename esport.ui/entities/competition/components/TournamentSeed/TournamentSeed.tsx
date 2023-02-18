import { FC } from "react";
import styles from "./tournamentSeed.module.scss";

import { TournamentSeedItem } from "@entities/competition/components/TournamentSeed/TournamentSeedItem";
import { TournamentSeedTeam } from "@entities/competition/components/TournamentSeed/TournamentSeedTeam";
import { IRenderSeedProps } from "@entities/competition/types/tournament/seed";
import { TournamentSeedTime } from "@entities/competition/components/TournamentSeed/TournamentSeedTime";

export const TournamentSeed: FC<IRenderSeedProps> = ({ seed }) => {
  return (
    <div className={styles.seed}>
      <TournamentSeedItem>
        <TournamentSeedTeam>
          {seed.teams?.[0]?.name || "-----------"}
        </TournamentSeedTeam>
        <TournamentSeedTeam>
          {seed.teams?.[1]?.name || "-----------"}
        </TournamentSeedTeam>
      </TournamentSeedItem>
      <TournamentSeedTime>{seed?.date}</TournamentSeedTime>
    </div>
  );
};
