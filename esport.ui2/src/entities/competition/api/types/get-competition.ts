import { ICompetition } from "../../model/types/competiton";
import { CompetitionOrganisation } from "../../model/types/competition-organisation";

type CompetitionWithOrganisation = ICompetition & CompetitionOrganisation;

export interface GetCompetitionWithOrganisationRequest {
  competitionId: number;
}

export interface GetCompetitionWithOrganisationResponse {
  competition: CompetitionWithOrganisation;
}
