import React, { FC } from "react";
import styles from "./LessonRecommendationList.module.css";

import { ILessonRecommendation } from "../../model/types/lesson-recommendation";
import { LessonRecommendationListItem } from "./LessonRecommendationListItem";
import { Card, Title } from "@/shared/ui";

interface LessonRecommendationListProps {
  className?: string;
  lessonRecommendations: ILessonRecommendation[];
}

export const LessonRecommendationList: FC<LessonRecommendationListProps> = ({
  className,
  lessonRecommendations,
}) => {
  return (
    <ul className={styles.wrapper}>
      {!!lessonRecommendations.length ? (
        lessonRecommendations.map((r) => (
          <li key={r.lessonId}>
            <LessonRecommendationListItem item={r} />
          </li>
        ))
      ) : (
        <Card>
          <Title center>Nothing found</Title>
        </Card>
      )}
    </ul>
  );
};
