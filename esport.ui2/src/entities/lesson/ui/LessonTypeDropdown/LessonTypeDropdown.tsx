import React, { FC } from "react";
import { LessonType, useTranslatedLessonType } from "../..";
import {
  Dropdown,
  DropdownBase,
  DropdownBaseProps,
  DropdownProps,
} from "@/shared/ui";

type LessonTypeDropdown = { title: string; value: LessonType };

interface LessonTypeDropdownBaseProps
  extends Omit<
    DropdownBaseProps<LessonTypeDropdown>,
    "list" | "displayKey" | "displayValue"
  > {
  className?: string;
}

export const LessonTypeDropdownBase: FC<LessonTypeDropdownBaseProps> = ({
  ...props
}) => {
  const translatedLessonType = useTranslatedLessonType();

  return (
    <DropdownBase
      {...props}
      name={"lessonType"}
      label={"Lesson type"}
      list={[
        {
          title: translatedLessonType[LessonType.Individual],
          value: LessonType.Individual,
        },
        {
          title: translatedLessonType[LessonType.Group],
          value: LessonType.Group,
        },
      ]}
      displayValue={"title"}
      displayKey={"value"}
    />
  );
};

interface LessonTypeDropdownProps
  extends Omit<
    DropdownProps<LessonTypeDropdown>,
    "list" | "displayKey" | "displayValue" | "name"
  > {
  name?: string;
}

export const LessonTypeDropdown: FC<LessonTypeDropdownProps> = ({
  name = "lessonType",
  ...props
}) => {
  const translatedLessonType = useTranslatedLessonType();

  return (
    <Dropdown
      {...props}
      name={name}
      label={"Lesson type"}
      list={[
        {
          title: translatedLessonType[LessonType.Individual],
          value: LessonType.Individual,
        },
        {
          title: translatedLessonType[LessonType.Group],
          value: LessonType.Group,
        },
      ]}
      displayValue={"title"}
      displayKey={"value"}
    />
  );
};
