import { CompetitorType } from "../../consts/competitor-type";
import { CompetitionRequest } from "./competition-request";

export interface ICompetitorOld {
  _id?: string;
  userId?: string;
  teamMemberIds?: string[];
  teamName?: string;
  weight?: number;
  height?: number;
  competitorType: CompetitorType;
}

export interface ICompetitor {
  id: number;
  name: string;
  userId?: number;
  fightId?: number;
  competitorType: CompetitorType;
  level: number;
  createdAt: string;
  updatedAt: string;
  height?: number;
  weight?: number;
  requests?: CompetitionRequest[];
  age?: number;
}
