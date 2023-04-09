import { FC } from "react";
import styles from "./tournamentSeed.module.scss";

import { TournamentRoundItem } from "@entities/competition/components/TournamentSeed/TournamentRoundItem";
import { TournamentRoundFight } from "@entities/competition/components/TournamentSeed/TournamentRoundFight";
import { IRenderRoundProps } from "@entities/competition/types/tournament/seed";
import { TournamentRoundInfo } from "@entities/competition/components/TournamentSeed/TournamentRoundInfo";

export const TournamentSeed: FC<IRenderRoundProps> = ({ round }) => {
  return (
    <div className={styles.seed}>
      <TournamentRoundItem>
        <TournamentRoundFight>
          {round.compatitors?.[0]?.name || "-----------"}
        </TournamentRoundFight>
        <TournamentRoundFight>
          {round.compatitors?.[1]?.name || "-----------"}
        </TournamentRoundFight>
      </TournamentRoundItem>
      <TournamentRoundInfo>{round?.roundNumber}</TournamentRoundInfo>
    </div>
  );
};
