import { useQuery } from "@tanstack/react-query";
import { competitionApi } from "@/entities/competition";

export const getAllCompetitionsQueryKey = ["getAllCompetitions"] as const;

export const useGetAllCompetitions = () => {
  return useQuery({
    queryKey: getAllCompetitionsQueryKey,
    queryFn: async () => {
      try {
        const { data } = await competitionApi.getAllCompetitions();
        return data;
      } catch (e) {
        throw e;
      }
    },
  });
};
