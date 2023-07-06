import { ICompetitonCommon } from "../../model/types/competiton";

export interface GetCompetitionsByOrganisationIdRequest {
  orgId?: number;
  includeClosedRegistration?: boolean;
}

export interface ICompetitionWithOrganisationAndCreator
  extends ICompetitonCommon {
  creator: {
    id: number;
    name: string;
  };
}
