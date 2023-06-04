export interface GetTrainerTimetableRequest {
  trainerId: number;
  gymId?: number;
  startDateTime?: string;
  dayRange?: number;
}
