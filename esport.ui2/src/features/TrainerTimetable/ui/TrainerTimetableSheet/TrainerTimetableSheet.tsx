import React, { Dispatch, FC, SetStateAction, useState } from "react";
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
import { getDayOfTheWeekByDayIndex, getTimeRangeStr } from "@/shared/lib";
import { LessonList } from "../LessonList/LessonList";
import { AddLessonForm } from "../AddLessonForm/AddLessonForm";
import { IAddLessonForm } from "../../model/types/AddLessonForm";

interface TrainerTimetableSheetProps {
  className?: string;
  open?: boolean;
  setOpen?: (p: boolean) => void;
  selectedEvent?: IDayTimetable;
  selectedDay?: Date;
  setSelectedEvent?: Dispatch<SetStateAction<IDayTimetable | undefined>>;
}

export const TrainerTimetableSheet: FC<TrainerTimetableSheetProps> = ({
  open,
  setOpen,
  selectedEvent,
  selectedDay,
  setSelectedEvent,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleClose = () => {
    setOpen?.(false);
    setIsFormVisible(false);
  };

  const handleManageFormVisible = (b: boolean) => () => setIsFormVisible(b);

  const handleSuccess = (data: IAddLessonForm) => {
    setSelectedEvent?.((prev) => {
      if (prev) {
        return {
          ...prev,
          timeTableLessons: [
            ...prev.timeTableLessons,
            {
              trainerId: prev.timeTableLessons?.[0]?.trainerId ?? 0,
              lessonId: 0,
              trainerName: "",
              from: data.from,
              to: data.to,
              lessonType: data.lessonType.value,
            },
          ],
        };
      }
    });
    handleManageFormVisible(false);
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
              lessons={selectedEvent?.timeTableLessons ?? []}
              onAddLesson={handleManageFormVisible(true)}
              className={styles.list}
            />
            {!isFormVisible && !!selectedEvent?.timeTableLessons.length && (
              <Button
                className={"mt-5"}
                onClick={handleManageFormVisible(true)}
              >
                + Add lesson
              </Button>
            )}
            {isFormVisible && (
              <AddLessonForm
                trainerScheduleId={selectedEvent?.trainerScheduleIds[0] ?? 0}
                dayOfTheWeek={getDayOfTheWeekByDayIndex(selectedDay)}
                onSuccess={handleSuccess}
                onCancel={handleManageFormVisible(false)}
              />
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
};
