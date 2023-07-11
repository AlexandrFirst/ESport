import { GetCompetitionsByOrganisationIdRequest } from "../types/get-competitions-by-organisation-id";
import { GetCompetitorRecordsRequest } from "../types/types";
import { GetCompetitionWithOrganisationRequest } from "../types/get-competition";

export const competitionQueryKeys = {
  all: ["competitions"],
  byIdWithOrganisation: (request?: GetCompetitionWithOrganisationRequest) => [
    ...competitionQueryKeys.all,
    "by-id",
    request,
  ],
  byOrgId: (request: GetCompetitionsByOrganisationIdRequest) => [
    ...competitionQueryKeys.all,
    "by-org-id",
    request,
  ],
  getCompetitorRecordsAll: () => [
    ...competitionQueryKeys.all,
    "get-competitor-records",
  ],
  getCompetitorRecords: (request: GetCompetitorRecordsRequest) => [
    ...competitionQueryKeys.all,
    "get-competitor-records",
    request,
  ],
  createCompetitionRequest: () => [
    ...competitionQueryKeys.all,
    "create-competition-request",
  ],
  deleteRequestById: () => [
    ...competitionQueryKeys.all,
    "delete-request-by-id",
  ],
};
