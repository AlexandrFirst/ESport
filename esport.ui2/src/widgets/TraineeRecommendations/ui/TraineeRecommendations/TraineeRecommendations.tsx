import React, { FC } from "react";

import { BeatLoader } from "react-spinners";

import { LoaderColor, LogicalOperation } from "@/shared/constants";
import { StickyContentLayout } from "@/shared/layouts";

import { useGetTraineeRecommendations } from "@/entities/trainee";
import {
  ILessonSportFilter,
  ILessonTimetableFilter,
  LessonRecommendationList,
} from "@/entities/lesson";

import {
  TraineeRecommendationFilters,
  useSelectTraineeRecommendationFilters,
} from "../../../../features/(trainee)/TraineeRecommendationFilters";

interface TraineeRecommendationsProps {
  className?: string;
}

const lessonSportFilter: ILessonSportFilter = {
  sportIds: [],
  logicalOperation: LogicalOperation.OR,
};

const lessonTimeTableFilter: ILessonTimetableFilter = {
  timeTableFilterUnits: [],
  logicalOperation: LogicalOperation.OR,
};

export const TraineeRecommendations: FC<TraineeRecommendationsProps> = ({
  className,
}) => {
  const {
    lessonType,
    lessonSportFilter,
    lessonTimeTableFilter,
    traumaHistoryRecords,
  } = useSelectTraineeRecommendationFilters();

  const { data, isLoading } = useGetTraineeRecommendations({
    page: 1,
    pageSize: 100,
    lessonType,
    traumaHistoryRecords,
    lessonSportFilter,
    lessonTimeTableFilter,
    trainerIds: [],
  });

  return (
    <StickyContentLayout
      right={<TraineeRecommendationFilters className={"w-[400px]"} />}
    >
      {isLoading ? (
        <div className={"flex justify-center"}>
          <BeatLoader color={LoaderColor} />
        </div>
      ) : (
        <LessonRecommendationList
          lessonRecommendations={data?.lessonRecomendations ?? []}
        />
      )}
    </StickyContentLayout>
  );
};
