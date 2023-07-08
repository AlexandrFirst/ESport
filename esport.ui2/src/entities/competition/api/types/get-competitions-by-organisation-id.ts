import { CompetitionOrganisation } from "../../model/types/competition-organisation";
import { ICompetition } from "../../model/types/competiton";
import { CompetitionUser } from "../../model/types/competition-creator";

type CompetitionWithOrganisationAndCreator = ICompetition &
  CompetitionOrganisation &
  CompetitionUser;

export interface GetCompetitionsByOrganisationIdRequest {
  orgId: number;
  includeClosedRegistration?: boolean;
}

export interface GetCompetitionsByOrganisationIdResponse {
  competitions: CompetitionWithOrganisationAndCreator[];
  organisation: CompetitionOrganisation;
}
