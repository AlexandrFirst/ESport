import { CompatitorType } from "@entities/competition/enums/competitor-type.enum";

export interface ICompetitor {
  _id?: string;
  userId?: number;
  team?: number[];
  teamName?: string;
  weight?: number;
  height?: number;
  type: CompatitorType;
}
