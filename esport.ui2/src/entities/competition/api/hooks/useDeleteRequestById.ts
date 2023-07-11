import { useMutation } from "@tanstack/react-query";
import { CompetitionApi, competitionQueryKeys } from "../..";
import { DeleteRequestByIdRequest } from "../types/types";

export const useDeleteRequestById = () => {
  return useMutation({
    mutationKey: competitionQueryKeys.deleteRequestById(),
    mutationFn: async (request: DeleteRequestByIdRequest) => {
      try {
        const api = await CompetitionApi();
        const { data } = await api.deleteCompetitionRequestById(request);
        return data;
      } catch (e: any) {
        throw e;
      }
    },
  });
};
