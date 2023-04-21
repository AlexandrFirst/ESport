import { CompatitorType } from '../enums/compatitorType.enum';

export interface ICompetitor {
  _id?: string;
  userId?: string;
  teamMemberIds?: string[];
  teamName?: string;
  weight?: number;
  height?: number;
  competitorType: CompatitorType;
}
