import { IGymTimetableByDate } from "@/entities/gym";

export interface GetTrainerTimetableRequest {
  trainerId: number;
  gymId?: number;
  startDateTime?: Date;
  dayRange?: number;
}

export interface GetTrainerTimetableResponse {
  gymTimeTable: IGymTimetableByDate[];
}
