import { FC } from "react";
import { ILessonRecommendation } from "../..";
import { BoldText, Card, RegularText } from "@/shared/ui";
import { getTimeRangeStr, useMappedDaysOfTheWeek } from "@/shared/lib";

interface LessonRecommendationListItemProps {
  className?: string;
  item: ILessonRecommendation;
}

export const LessonRecommendationListItem: FC<
  LessonRecommendationListItemProps
> = ({ item, className }) => {
  const translatedDays = useMappedDaysOfTheWeek();

  return (
    <Card padding={"md"} className={className}>
      <div className={"flex items-center justify-between"}>
        <BoldText size={"xl"}>
          Sports: {item.sportInfo.sportName ?? "--"}
        </BoldText>
        <RegularText>Trainer: {item.trainerName}</RegularText>
      </div>
      <RegularText className={"mt-5"}>
        Days: {translatedDays[item.lessonTimeTable.dayOfTheWeek] ?? "--"}
      </RegularText>
      <RegularText className={"mt-2"}>
        Time: {getTimeRangeStr(item.lessonTimeTable)}
      </RegularText>
    </Card>
  );
};