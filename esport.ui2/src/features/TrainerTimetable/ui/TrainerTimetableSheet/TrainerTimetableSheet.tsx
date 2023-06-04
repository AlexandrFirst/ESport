import React, { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/shared/ui";
import { IDayTimetable } from "@/entities/gym";
import { getTimeFromTimeSpan } from "@/shared/lib";

interface TrainerTimetableSheetProps {
  className?: string;
  open?: boolean;
  setOpen?: (p: boolean) => void;
  selectedEvent?: IDayTimetable;
}

export const TrainerTimetableSheet: FC<TrainerTimetableSheetProps> = ({
  open,
  setOpen,
  selectedEvent,
}) => {
  const handleClose = () => {
    setOpen?.(false);
  };

  return (
    <Sheet open={open}>
      <SheetContent onClickClose={handleClose}>
        <SheetHeader>
          <SheetTitle>
            Timetable ({getTimeFromTimeSpan(selectedEvent?.from)} -{" "}
            {getTimeFromTimeSpan(selectedEvent?.to)})
          </SheetTitle>
          {/*TODO: add form*/}
          <SheetDescription>
            {selectedEvent?.timeTableLessons.map((lesson) => lesson.lessonType)}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
