import { LogicalOperation } from "@/shared/constants";

export interface ILessonSportFilter {
  sportIds: number[];
  logicalOperation: LogicalOperation;
}
