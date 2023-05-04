import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "@/shared/lib";

import { competitionApi } from "../api";
import { ICreateCompetitionForm } from "../../model/types/create-competitiom-form";

export const useCreateCompetition = (
  params?: UseMutationOptions<
    AxiosResponse<any, any>,
    AxiosError<unknown, any>,
    ICreateCompetitionForm
  >
) => {
  const { showError } = useSnackbar();
  return useMutation({
    mutationFn: competitionApi.createCompetition,
    onError: (error: AxiosError) => {
      showError(error.message, { position: "topRight" });
    },
    ...params,
  });
};
