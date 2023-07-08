import { useMutation } from "@tanstack/react-query";
import { CreateCompetitionRequest } from "../types/types";
import { CompetitionApi } from "../../api/competitionApi";
import { competitionQueryKeys } from "../../api/hooks/competitionQueryKeys";

export const useCreateCompetitionRequest = () => {
  return useMutation({
    mutationKey: competitionQueryKeys.createCompetitionRequest(),
    mutationFn: async (request: CreateCompetitionRequest) => {
      try {
        const api = await CompetitionApi();
        const { data } = await api.createCompetitionRequest(request);
        return data;
      } catch (e: any) {
        throw e;
      }
    },
  });
};
