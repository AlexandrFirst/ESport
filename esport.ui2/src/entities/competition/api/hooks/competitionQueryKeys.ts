import { GetCompetitionsByOrganisationIdRequest } from "../types/get-competitions-by-organisation-id";

export const competitionQueryKeys = {
  all: ["competitions"],
  byId: (id: string) => [...competitionQueryKeys.all, "by-id", id],
  byOrgId: (request: GetCompetitionsByOrganisationIdRequest) => [
    ...competitionQueryKeys.all,
    "by-org-id",
    request,
  ],
};
