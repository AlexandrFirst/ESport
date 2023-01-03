import { CompatitorType } from "../enums";

export interface ICompetitor {
  _id?: string;
  displayName: string;
  weight?: number;
  height?: number;
  type: CompatitorType;
}
