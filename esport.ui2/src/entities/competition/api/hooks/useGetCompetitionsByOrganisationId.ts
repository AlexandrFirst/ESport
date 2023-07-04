import { ApiContext } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

import { CompetitionApi } from "../../api/competitionApi";

import { competitionQueryKeys } from "./competitionQueryKeys";
import { CompetitionError } from "../../model/types/competition-error";

interface UseGetCompetitionsByOrganisationIdProps {
  orgId?: number;
}

export const getCompetitionsByOrganisationId = async (
  { orgId }: UseGetCompetitionsByOrganisationIdProps,
  ctx?: ApiContext
) => {
  try {
    const api = await CompetitionApi(ctx);
    const { data } = await api.getCompetitionsByOrganisationId(orgId ?? 0);
    return data;
  } catch (e: any) {
    if (e?.statusCode !== 500) {
      throw e;
    }
    throw new CompetitionError("Something went wrong, please try again", 500);
  }
};

export const useCompetitionsByOrganisationId = (
  request: UseGetCompetitionsByOrganisationIdProps,
  ctx?: ApiContext
) => {
  return useQuery<
    Awaited<ReturnType<typeof getCompetitionsByOrganisationId>>,
    CompetitionError
  >({
    queryKey: competitionQueryKeys.byOrgId(request.orgId),
    queryFn: async () => getCompetitionsByOrganisationId(request, ctx),
  });
};
