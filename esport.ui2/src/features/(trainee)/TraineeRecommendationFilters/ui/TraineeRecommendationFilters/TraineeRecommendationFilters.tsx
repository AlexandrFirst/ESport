import React, { ChangeEvent, FC, useEffect, useState } from "react";
import styles from "./TraineeRecommendationFilters.module.css";

import cn from "classnames";

import {
  Autocomplete,
  BoldText,
  Button,
  DatePickerBase,
  ScrollArea,
  TimeInputBase,
  Toggle,
} from "@/shared/ui";
import { capitalize, useMappedDaysOfTheWeek } from "@/shared/lib";
import { DayOfTheWeek, LogicalOperation } from "@/shared/constants";

import {
  LessonTypeDropdownBase,
  useTranslatedLessonType,
} from "@/entities/lesson";
import { ITrauma, useGetTraumas } from "@/entities/trauma";
import { ISport, useGetAllSports } from "@/entities/sport";

import { useSelectTraineeRecommendationFilters } from "../../model/selectors/selectTraineeRecommendationFilters/selectTraineeRecommendationFilters";
import { useTraineeRecommendationFiltersActions } from "../../model/slices/TraineeRecommendationFiltersSlice";

interface RecommendationFiltersProps {
  className?: string;
}

export const TraineeRecommendationFilters: FC<RecommendationFiltersProps> = ({
  className,
}) => {
  const translatedDaysOfTheWeek = useMappedDaysOfTheWeek();
  const translatedLessonType = useTranslatedLessonType();

  const {
    setLessonType,
    setTimeTableLogicalOperation,
    setSportLogicalOperation,
    setTraumaHistoryRecords,
    removeTraumaHistoryRecord,
    setSportIds,
    setTimeTableFilterUnits,
    removeTimeTableFilterUnit,
    resetFilters,
  } = useTraineeRecommendationFiltersActions();

  const { lessonType, lessonSportFilter, lessonTimeTableFilter } =
    useSelectTraineeRecommendationFilters();

  const { data: traumas, isLoading: traumasIsLoading } = useGetTraumas();
  const { data: sports, isLoading: sportsAreLoading } = useGetAllSports();

  const [selectedTraumas, setSelectedTraumas] = useState<ITrauma[]>([]);
  const [selectedDays, setSelectedDays] = useState<DayOfTheWeek[]>([]);

  const handleSetTraumaHistoryRecords =
    (trauma: ITrauma, key: "from" | "to") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setTraumaHistoryRecords({
        traumaId: trauma.id,
        key,
        value: e.target.value,
      });
    };

  const handleSetTimetableUnits =
    (dayOfTheWeek: DayOfTheWeek, key: "from" | "to") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setTimeTableFilterUnits({
        dayOfTheWeek,
        key,
        value: e.target.value,
      });
    };

  const handleResetFilters = () => {
    resetFilters();
    setSelectedTraumas([]);
    setSelectedDays([]);
  };

  useEffect(() => {
    removeTraumaHistoryRecord(selectedTraumas.map((t) => t.id));
  }, [removeTraumaHistoryRecord, selectedTraumas]);

  useEffect(() => {
    removeTimeTableFilterUnit(selectedDays.map((d) => d));
  }, [removeTimeTableFilterUnit, selectedDays]);

  const daysOfTheWeek = [
    {
      id: DayOfTheWeek.MONDAY,
      title: translatedDaysOfTheWeek[DayOfTheWeek.MONDAY],
    },
    {
      id: DayOfTheWeek.TUESDAY,
      title: translatedDaysOfTheWeek[DayOfTheWeek.TUESDAY],
    },
    {
      id: DayOfTheWeek.WEDNESDAY,
      title: translatedDaysOfTheWeek[DayOfTheWeek.WEDNESDAY],
    },
    {
      id: DayOfTheWeek.THURSDAY,
      title: translatedDaysOfTheWeek[DayOfTheWeek.THURSDAY],
    },
    {
      id: DayOfTheWeek.FRIDAY,
      title: translatedDaysOfTheWeek[DayOfTheWeek.FRIDAY],
    },
    {
      id: DayOfTheWeek.SATURDAY,
      title: translatedDaysOfTheWeek[DayOfTheWeek.SATURDAY],
    },
    {
      id: DayOfTheWeek.SUNDAY,
      title: translatedDaysOfTheWeek[DayOfTheWeek.SUNDAY],
    },
  ];

  return (
    <div className={cn(styles.wrapper, className)}>
      <ScrollArea className={"h-[calc(100vh-100px)] pr-2"}>
        <LessonTypeDropdownBase
          fullWidth
          className={"mt-10"}
          onChange={({ value }) => setLessonType(value)}
          value={{
            title: translatedLessonType[lessonType],
            value: lessonType,
          }}
        />
        <Autocomplete<ITrauma>
          list={traumas}
          displayValue={"name"}
          displayKey={"id"}
          lazy
          multiple
          label={"Traumas"}
          fullWidth
          loading={traumasIsLoading}
          className={"mt-20"}
          value={selectedTraumas}
          onChange={setSelectedTraumas}
        />
        {selectedTraumas.map((trauma) => (
          <div key={trauma.id} className={"flex gap-2 mb-3 items-center"}>
            <BoldText className={"flex-1"}>{capitalize(trauma.name)}</BoldText>
            <DatePickerBase
              label={"From"}
              onChange={handleSetTraumaHistoryRecords(trauma, "from")}
              fullWidth
            />
            <DatePickerBase
              label={"To"}
              onChange={handleSetTraumaHistoryRecords(trauma, "to")}
              fullWidth
            />
          </div>
        ))}
        <div className={"flex justify-between gap-3 items-center"}>
          <Autocomplete<ISport>
            className={"flex-1"}
            list={sports}
            displayValue={"name"}
            displayKey={"id"}
            lazy
            multiple
            label={"Sports"}
            fullWidth
            loading={sportsAreLoading}
            value={sports?.filter((s) =>
              lessonSportFilter.sportIds.includes(s.id)
            )}
            onChange={(value) => setSportIds(value.map((s) => s.id))}
          />
          <Toggle
            enabled={
              lessonSportFilter.logicalOperation === LogicalOperation.AND
            }
            setEnabled={setSportLogicalOperation}
            label={"And"}
          />
        </div>

        <div className={"flex justify-between gap-3 items-center"}>
          <Autocomplete<{ id: DayOfTheWeek; title: string }>
            className={"flex-1"}
            list={daysOfTheWeek}
            displayValue={"title"}
            displayKey={"id"}
            multiple
            label={"Day of the week"}
            fullWidth
            loading={sportsAreLoading}
            value={daysOfTheWeek.filter((d) => selectedDays.includes(d.id))}
            onChange={(values) =>
              setSelectedDays(values.map((v) => v.id).sort((a, b) => a - b))
            }
          />
          <Toggle
            enabled={
              lessonTimeTableFilter.logicalOperation === LogicalOperation.AND
            }
            setEnabled={setTimeTableLogicalOperation}
            label={"And"}
          />
        </div>
        {selectedDays.map((day) => (
          <div key={day} className={"flex items-center gap-3"}>
            <BoldText>{translatedDaysOfTheWeek[day]}</BoldText>
            <TimeInputBase
              onChange={handleSetTimetableUnits(day, "from")}
              label="From"
              fullWidth
            />
            <TimeInputBase
              onChange={handleSetTimetableUnits(day, "to")}
              label="To"
              fullWidth
            />
          </div>
        ))}
        <div className={"flex justify-end"}>
          <Button variant={"text"} onClick={handleResetFilters}>
            Reset
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};
