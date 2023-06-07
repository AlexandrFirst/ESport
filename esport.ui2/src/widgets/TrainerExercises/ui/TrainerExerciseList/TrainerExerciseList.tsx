import React, { FC } from "react";

import { StickyContentLayout } from "@/shared/layouts";

import { ExerciseInfoList } from "@/entities/exercise";
import { useGetExercises } from "@/entities/trainer";
import { Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";

interface TrainerExerciseListProps {
  className?: string;
}

export const TrainerExerciseList: FC<TrainerExerciseListProps> = ({
  className,
}) => {
  const { data } = useGetExercises({
    page: 1,
    pageSize: 100,
    isMine: true,
    name: "",
    bodyParts: [],
    sports: [],
  });

  return (
    <StickyContentLayout>
      <ExerciseInfoList
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
