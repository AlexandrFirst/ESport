import { ICompetitor } from "../../model/types/competitor";
import { CompetitorType } from "../../consts/competitor-type";

export interface GetCompetitorRecordsRequest {
  userId: number;
  competitionId: number;
}

export interface GetCompetitorRecordsResponse {
  userCompetitorRecords: ICompetitor[];
}

export interface CreateCompetitionRequest {
  competitionId: number;
  userId: number;
  level: number;
  weight: number;
  height: number;
  competitorType: CompetitorType;
}

export interface DeleteRequestByIdRequest {
  id: number;
}
