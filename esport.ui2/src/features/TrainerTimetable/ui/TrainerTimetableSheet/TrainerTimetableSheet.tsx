import React, { FC, useState } from "react";
import styles from "./TrainerTimetableSheet.module.css";

import {
  Button,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui";
import { IDayTimetable } from "@/entities/gym";
import { getTimeRangeStr } from "@/shared/lib";
import { ITimetableLesson, LessonType } from "@/entities/lesson";
import { LessonList } from "../LessonList/LessonList";
import { AddLessonForm } from "../AddLessonForm/AddLessonForm";

interface TrainerTimetableSheetProps {
  className?: string;
  open?: boolean;
  setOpen?: (p: boolean) => void;
  selectedEvent?: IDayTimetable;
}

const mocked_lessons: ITimetableLesson[] = [
  {
    lessonId: 1,
    from: "12:00:00",
    to: "13:00:00",
    lessonType: LessonType.Group,
    trainerId: 1,
    trainerName: "John",
  },
  {
    lessonId: 12,
    from: "15:00:00",
    to: "16:00:00",
    lessonType: LessonType.Individual,
    trainerId: 1,
    trainerName: "John",
  },
];

export const TrainerTimetableSheet: FC<TrainerTimetableSheetProps> = ({
  open,
  setOpen,
  selectedEvent,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleClose = () => {
    setOpen?.(false);
  };

  const handleManageFormVisible = (b: boolean) => () => setIsFormVisible(b);

  const [a, setA] = useState(false);
  const test = () => {
    setA(true);
    setTimeout(() => {
      setA(false);
    }, 3000);
  };

  return (
    <>
      <Sheet open={open}>
        <SheetContent onClickClose={handleClose}>
          <SheetHeader>
            <SheetTitle>
              Timetable {selectedEvent && `(${getTimeRangeStr(selectedEvent)})`}
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className={styles.scroll}>
            <LessonList
              lessons={mocked_lessons}
              onAddLesson={handleManageFormVisible(true)}
              className={styles.list}
            />
            {!isFormVisible && (
              <Button
                className={"mt-5"}
                onClick={handleManageFormVisible(true)}
              >
                + Add lesson
              </Button>
            )}
            {isFormVisible && (
              <AddLessonForm
                onSuccess={handleManageFormVisible(false)}
                onCancel={handleManageFormVisible(false)}
              />
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};
