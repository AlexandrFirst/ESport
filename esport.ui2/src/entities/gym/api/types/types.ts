import { BaseListingResult } from "@/shared/types";
import { DayOfTheWeek } from "@/shared/constants";

import { IGymTimetable } from "../../model/types/gym-timetable";
import { IGymReadInfo } from "../../model/types/gym-read-info";

export interface IGymListingRequest {
  gymIds?: number[];
  organisationIds?: number[];
  name?: string;
  address?: string;
  openHour?: Date;
  closeHour?: Date;
  page: number;
  pageSize: number;
}

export interface IGymListingResponse extends BaseListingResult {
  gymReadInfos: IGymReadInfo[];
}

export interface GetGymTimetableRequest {
  dayOfTheWeeks: DayOfTheWeek[];
}

export interface GetGymTimetableResponse {
  gymTimeTable: IGymTimetable[];
}
