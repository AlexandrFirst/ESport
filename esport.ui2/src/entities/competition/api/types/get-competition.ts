import { ICompetition } from "../../model/types/competiton";

export interface GetCompetitionWithOrganisationRequest {
  competitionId: number;
  includeRequests?: boolean;
}

export interface GetCompetitionWithOrganisationResponse {
  competition: ICompetition;
}
