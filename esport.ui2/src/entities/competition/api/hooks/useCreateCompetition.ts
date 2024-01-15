import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

import { ICreateCompetitionBasicForm } from "../../model/types/create-competitiom-form";
import { CompetitionApi } from "../competitionApi";

export const useCreateCompetition = (
  options?: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    ICreateCompetitionBasicForm
  >
) => {
  return useMutation({
    mutationKey: ["createCompetition"],
    mutationFn: async (request: ICreateCompetitionBasicForm) => {
      try {
        const { data } = await CompetitionApi().createCompetition(request);
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
