import { CompatitorType } from "../enums";

export interface ICompetitor {
  _id?: string;
  userId?: number;
  teamMemberIds?: number[];
  teamName?: string;
  weight?: number;
  height?: number;
  type: CompatitorType;
}
