import { CompatitorType } from "../../consts/competitor-type";

export interface ICompetitor {
  _id?: string;
  userId?: string;
  teamMemberIds?: string[];
  teamName?: string;
  weight?: number;
  height?: number;
  competitorType: CompatitorType;
}
