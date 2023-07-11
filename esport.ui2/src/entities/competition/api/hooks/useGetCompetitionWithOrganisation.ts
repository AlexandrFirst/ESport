import { useQuery } from "@tanstack/react-query";
import { ApiContext } from "@/shared/types";

import { CompetitionApi } from "../../api/competitionApi";
import { competitionQueryKeys } from "../../api/hooks/competitionQueryKeys";

import { CompetitionError } from "../../model/types/competition-error";
import { GetCompetitionWithOrganisationRequest } from "../types/get-competition";

export const getCompetitionWithOrganisation = async (
  request: GetCompetitionWithOrganisationRequest,
  ctx?: ApiContext
) => {
  try {
    const api = await CompetitionApi(ctx);
    const { data } = await api.getCompetitionWithOrganisation(request);
    return data;
  } catch (e: any) {
    if (e?.statusCode !== 500) {
      throw e;
    }
    throw new CompetitionError("Something went wrong, please try again", 500);
  }
};

export const useCompetitionWithOrganisation = (
  request: GetCompetitionWithOrganisationRequest,
  ctx?: ApiContext
) => {
  return useQuery<
    Awaited<ReturnType<typeof getCompetitionWithOrganisation>>,
    CompetitionError
  >({
    queryKey: competitionQueryKeys.byIdWithOrganisation(request),
    queryFn: async () => getCompetitionWithOrganisation(request, ctx),
  });
};
