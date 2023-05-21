import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { useSnackbar } from "@/shared/lib";

import { ISport } from "../../model/types/sport";
import { SportApi } from "../../api/sportApi";

export const useGetAllSportsKeys = ["sports", "getAllSports"] as const;

export const useGetAllSports = (options?: UseQueryOptions<ISport[]>) => {
  const { showError } = useSnackbar();
  return useQuery({
    queryKey: useGetAllSportsKeys,
    queryFn: SportApi().getAllSports,
    onError(error: any) {
      showError(error.message);
    },
    ...options,
  });
};
