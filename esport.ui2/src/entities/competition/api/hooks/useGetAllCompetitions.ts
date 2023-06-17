import { useQuery } from "@tanstack/react-query";
import { ApiContext } from "@/shared/types";
import { CompetitionApi } from "../competitionApi";

export const getAllCompetitionsQueryKey = ["getAllCompetitions"] as const;

export const useGetAllCompetitions = (ctx?: ApiContext) => {
  return useQuery({
    queryKey: getAllCompetitionsQueryKey,
    queryFn: async () => {
      try {
        const api = await CompetitionApi(ctx);
        const { data } = await api.getAllCompetitions();
        return data;
      } catch (e) {
        throw e;
      }
    },
  });
};
