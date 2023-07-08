import { useQuery } from "@tanstack/react-query";
import { ApiContext } from "@/shared/types";

import { CompetitionApi } from "../../api/competitionApi";
import { competitionQueryKeys } from "../../api/hooks/competitionQueryKeys";

import { CompetitionError } from "../../model/types/competition-error";
import { GetCompetitorRecordsRequest } from "../types/types";

export const getCompetitorRecords = async (
  request: GetCompetitorRecordsRequest,
  ctx?: ApiContext
) => {
  try {
    const api = await CompetitionApi(ctx);
    const { data } = await api.getCompetitorRecords(request);
    return data;
  } catch (e: any) {
    if (e?.statusCode !== 500) {
      throw e;
    }
    throw new CompetitionError("Something went wrong, please try again", 500);
  }
};

export const useGetCompetitorRecords = (
  request: GetCompetitorRecordsRequest,
  ctx?: ApiContext
) => {
  return useQuery<
    Awaited<ReturnType<typeof getCompetitorRecords>>,
    CompetitionError
  >({
    queryKey: competitionQueryKeys.getCompetitorRecords(request),
    queryFn: async () => getCompetitorRecords(request, ctx),
  });
};
