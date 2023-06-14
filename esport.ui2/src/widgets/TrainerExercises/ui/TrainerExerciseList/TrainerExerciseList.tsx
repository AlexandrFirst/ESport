import React, { FC } from "react";
import styles from "./TrainerExerciseList.module.css";

import { StickyContentLayout } from "@/shared/layouts";

import { ExerciseInfoList, IExerciseInfo } from "@/entities/exercise";
import { useGetExercises } from "@/entities/trainer";
import { Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";
import { useCurrentUserProfileInfo } from "@/entities/user";
import {
  TrainerExerciseFliters,
  useSelectTrainerExerciseFilters,
} from "@/features/TrainerExerciseFliters";

interface TrainerExerciseListProps {
  className?: string;
}

const m: IExerciseInfo[] = [
  {
    name: "ALALALLA",
    description: "aalalalalala",
    exerciseTutorialLinks: [1, 2, 3, 1111],
    sportRelations: [],
    bodypartRelation: [],
    traumaRelations: [],
  },
];

export const TrainerExerciseList: FC<TrainerExerciseListProps> = ({
  className,
}) => {
  const { trainerSports } = useCurrentUserProfileInfo();
  const { sports, isMine, name, bodyParts } = useSelectTrainerExerciseFilters();

  const { data, isLoading } = useGetExercises({
    page: 1,
    pageSize: 100,
    isMine,
    name,
    bodyParts,
    // sports: trainerSports.map(({ sportId }) => sportId),
    sports,
  });

  return (
    <StickyContentLayout right={<TrainerExerciseFliters />}>
      {!!data?.exerciseInfos.length && (
        <div className={styles.link}>
          <UILink size={"xl"} href={routes.Trainer.CreateExcercise()}>
            Create exercise
          </UILink>
        </div>
      )}
      <ExerciseInfoList
        isLoading={isLoading}
        list={data?.exerciseInfos ?? []}
        emptyState={
          <>
            <Title center>There is no data</Title>
            <div className={"flex justify-center mt-3"}>
              <UILink href={routes.Trainer.CreateExcercise()}>
                Lets create exercise
              </UILink>
            </div>
          </>
        }
      />
    </StickyContentLayout>
  );
};
