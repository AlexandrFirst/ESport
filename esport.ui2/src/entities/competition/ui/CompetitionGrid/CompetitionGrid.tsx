import React, { FC, Fragment } from "react";
import styles from "./CompetitionGrid.module.css";

import { ICategoryWithRounds } from "../../model/types/category";
import { Round } from "@/entities/competition/ui/Round/Round";
import { SeedsList } from "@/entities/competition/ui/SeedsList/SeedsList";

interface CompetitionGridProps {
  category?: ICategoryWithRounds;
  className?: string;
}

export const CompetitionGrid: FC<CompetitionGridProps> = ({
  className,
  category,
}) => {
  if (!category) return null;

  const data = category.rounds.map((round, roundIdx) => (
    <Round
      key={round._id}
      // className={roundClassName}
      // mobileBreakpoint={mobileBreakpoint}
    >
      {/*{round.title && roundTitleComponent(round.title, roundIdx)}*/}
      <SeedsList>
        {round.fights.map((seed, idx) => {
          return (
            <Fragment key={seed._id}>
              {/*{renderSeedComponent({*/}
              {/*  seed,*/}
              {/*  breakpoint: mobileBreakpoint,*/}
              {/*  roundIndex: roundIdx,*/}
              {/*  seedIndex: idx,*/}
              {/*  rounds,*/}
              {/*})}*/}
            </Fragment>
          );
        })}
      </SeedsList>
    </Round>
  ));

  return <div className={styles.wrapper}>CompetitionGrid</div>;
};
