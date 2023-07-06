import React, { FC } from "react";
import styles from "./LessonList.module.css";

import cn from "classnames";

import { BoldText, Button, Title } from "@/shared/ui";

import { ITimetableLesson } from "@/entities/lesson";

import { LessonListItem } from "./LessonListItem";

interface LessonListProps {
  lessons: ITimetableLesson[];
  onAddLesson?: () => void;
  className?: string;
}

export const LessonList: FC<LessonListProps> = ({
  lessons,
  onAddLesson,
  className,
}) => {
  return lessons.length ? (
    <ul className={cn(styles.wrapper, className)}>
      <Title>Lessons:</Title>
      {lessons.map((l) => (
        <li key={l.lessonId} className={styles.list_item}>
          <LessonListItem lesson={l} />
        </li>
      ))}
    </ul>
  ) : (
    <div className={"flex flex-col justify-center"}>
      <BoldText size={"xl"} center>
        There are no lessons added for now
      </BoldText>
      <Button variant={"text"} onClick={onAddLesson}>
        Lets add
      </Button>
    </div>
  );
};
