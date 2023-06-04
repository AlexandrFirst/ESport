import { BaseListingResult } from "@/shared/types";
import { DayOfTheWeek } from "@/shared/constants";

import { IGymTimetable } from "../../model/types/gym-timetable";
import { IGymReadInfo } from "../../model/types/gym-read-info";
import { IGymShiftInfo } from "../../model/types/gym-shift-info";
import { IGymWorkingHours } from "../..";

export interface IGymListingRequest {
  gymIds?: number[];
  organisationIds?: number[];
  name?: string;
  address?: string;
  openHour?: string;
  closeHour?: string;
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
  gymWorkingHours: IGymWorkingHours[];
  gymTimeTable: IGymTimetable[];
}

export interface AddUpdateGymTimetableRequest {
  gymId: number;
  gymShiftInfos: IGymShiftInfo[];
}

export interface CreateTrainerRequestRequest {
  shiftId: number;
  description: string;
}
