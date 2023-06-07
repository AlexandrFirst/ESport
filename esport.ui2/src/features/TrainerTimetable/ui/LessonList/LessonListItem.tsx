import { FC } from "react";
import styles from "./LessonList.module.css";

import { User, Users, Watch } from "lucide-react";

import { getTimeRangeStr } from "@/shared/lib";

import {
  ITimetableLesson,
  LessonType,
  useTranslatedLessonType,
} from "@/entities/lesson";
import { BoldText, Card, Icon, RegularText } from "@/shared/ui";
import { FlexContainer } from "./FlexContainer";

interface LessonListItemProps {
  lesson: ITimetableLesson;
}

export const LessonListItem: FC<LessonListItemProps> = ({ lesson }) => {
  const translatedLessonType = useTranslatedLessonType();
  return (
    <Card padding={"md"} className={styles.card}>
      <FlexContainer>
        <Icon
          Svg={lesson.lessonType === LessonType.Group ? Users : User}
          iconSize={"m"}
          fill={false}
        />
        <RegularText>{translatedLessonType[lesson.lessonType]}</RegularText>
      </FlexContainer>
      <FlexContainer className={"mt-3"}>
        <Icon Svg={Watch} iconSize={"m"} fill={false} />
        <BoldText>{getTimeRangeStr(lesson)}</BoldText>
      </FlexContainer>
    </Card>
  );
};
