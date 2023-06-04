import { ITrainerInfo } from "./trainer-info";
import { IScheduleInfo } from "./schedule-info";

export interface IPendingTrainerModel {
  requestId: number;
  trainerInfo: ITrainerInfo;
  scheduleInfo: IScheduleInfo;
}
