import { GetCompetitionsByOrganisationIdRequest } from "../types/get-competitions-by-organisation-id";
import {
  CreateCompetitionRequest,
  GetCompetitorRecordsRequest,
} from "../types/types";

export const competitionQueryKeys = {
  all: ["competitions"],
  byIdWithOrganisation: (id: number) => [
    ...competitionQueryKeys.all,
    "by-id",
    id,
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
};
