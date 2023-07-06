import { ApiContext } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

import { CompetitionApi } from "../../api/competitionApi";

import { competitionQueryKeys } from "./competitionQueryKeys";
import { CompetitionError } from "../../model/types/competition-error";
import { GetCompetitionsByOrganisationIdRequest } from "../types/get-competitions-by-organisation-id";

export const getCompetitionsByOrganisationId = async (
  {
    orgId = 0,
    includeClosedRegistration = false,
  }: GetCompetitionsByOrganisationIdRequest,
  ctx?: ApiContext
) => {
  try {
    const api = await CompetitionApi(ctx);
    const { data } = await api.getCompetitionsByOrganisationId({
      orgId,
      includeClosedRegistration,
    });
    return data;
  } catch (e: any) {
    if (e?.statusCode !== 500) {
      throw e;
    }
    throw new CompetitionError("Something went wrong, please try again", 500);
  }
};

export const useCompetitionsByOrganisationId = (
  request: GetCompetitionsByOrganisationIdRequest,
  ctx?: ApiContext
) => {
  return useQuery<
    Awaited<ReturnType<typeof getCompetitionsByOrganisationId>>,
    CompetitionError
  >({
    queryKey: competitionQueryKeys.byOrgId(request),
    queryFn: async () => getCompetitionsByOrganisationId(request, ctx),
  });
};
