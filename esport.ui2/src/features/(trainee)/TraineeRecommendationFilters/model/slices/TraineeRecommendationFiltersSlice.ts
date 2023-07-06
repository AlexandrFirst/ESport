import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/shared/lib";
import { LogicalOperation } from "@/shared/constants";

import { LessonType } from "@/entities/lesson";

import { TraineeRecommendationFiltersSchema } from "../types/TraineeRecommendationFiltersSchema";

const initialState: TraineeRecommendationFiltersSchema = {
  lessonType: LessonType.Individual,
  traumaHistoryRecords: [],
  lessonSportFilter: {
    sportIds: [],
    logicalOperation: LogicalOperation.OR,
  },
  lessonTimeTableFilter: {
    timeTableFilterUnits: [],
    logicalOperation: LogicalOperation.OR,
  },
};

type TraineeHistoryPayload = {
  traumaId: number;
  key: "from" | "to";
  value: string;
};

type TimeTableFilterUnitPayload = {
  dayOfTheWeek: number;
  key: "from" | "to";
  value: string;
};

export const TraineeRecommendationFiltersSlice = buildSlice({
  name: "TraineeRecommendationFilters",
  initialState,
  reducers: {
    setLessonType(state, action: PayloadAction<LessonType>) {
      state.lessonType = action.payload;
    },
    setSportLogicalOperation(state, action: PayloadAction<boolean>) {
      state.lessonSportFilter.logicalOperation = action.payload
        ? LogicalOperation.AND
        : LogicalOperation.OR;
    },
    setTimeTableLogicalOperation(state, action: PayloadAction<boolean>) {
      state.lessonTimeTableFilter.logicalOperation = action.payload
        ? LogicalOperation.AND
        : LogicalOperation.OR;
    },
    setTraumaHistoryRecords(
      state,
      action: PayloadAction<TraineeHistoryPayload>
    ) {
      const isFound = state.traumaHistoryRecords.some(
        ({ traumaId }) => traumaId === action.payload.traumaId
      );
      if (!isFound) {
        state.traumaHistoryRecords.push({
          traumaId: action.payload.traumaId,
          from: action.payload.key === "from" ? action.payload.value : "",
          to: action.payload.key === "to" ? action.payload.value : "",
        });
      } else {
        state.traumaHistoryRecords = state.traumaHistoryRecords.map(
          (record) => {
            if (record.traumaId === action.payload.traumaId) {
              return {
                ...record,
                [action.payload.key]: action.payload.value,
              };
            }
            return record;
          }
        );
      }
    },
    removeTraumaHistoryRecord(state, action: PayloadAction<number[]>) {
      state.traumaHistoryRecords = state.traumaHistoryRecords.filter(
        ({ traumaId }) => !action.payload.includes(traumaId)
      );
    },
    setSportIds(state, action: PayloadAction<number[]>) {
      state.lessonSportFilter.sportIds = action.payload;
    },
    setTimeTableFilterUnits(
      state,
      action: PayloadAction<TimeTableFilterUnitPayload>
    ) {
      const isFound = state.lessonTimeTableFilter.timeTableFilterUnits.some(
        ({ dayOfTheWeek }) => dayOfTheWeek === action.payload.dayOfTheWeek
      );
      if (!isFound) {
        state.lessonTimeTableFilter.timeTableFilterUnits.push({
          dayOfTheWeek: action.payload.dayOfTheWeek,
          from: action.payload.key === "from" ? action.payload.value : "00:00",
          to: action.payload.key === "to" ? action.payload.value : "00:00",
        });
      } else {
        state.lessonTimeTableFilter.timeTableFilterUnits =
          state.lessonTimeTableFilter.timeTableFilterUnits.map((unit) => {
            if (unit.dayOfTheWeek === action.payload.dayOfTheWeek) {
              return {
                ...unit,
                [action.payload.key]: action.payload.value,
              };
            }
            return unit;
          });
      }
    },
    removeTimeTableFilterUnit(state, action: PayloadAction<number[]>) {
      state.lessonTimeTableFilter.timeTableFilterUnits =
        state.lessonTimeTableFilter.timeTableFilterUnits.filter(
          ({ dayOfTheWeek }) => !action.payload.includes(dayOfTheWeek)
        );
    },
    resetFilters(state) {
      state.lessonSportFilter = initialState.lessonSportFilter;
      state.lessonTimeTableFilter = initialState.lessonTimeTableFilter;
      state.traumaHistoryRecords = initialState.traumaHistoryRecords;
      state.lessonType = initialState.lessonType;
    },
  },
});

export const {
  useActions: useTraineeRecommendationFiltersActions,
  actions: TraineeRecommendationFiltersActions,
  reducer: TraineeRecommendationFiltersReducer,
} = TraineeRecommendationFiltersSlice;
