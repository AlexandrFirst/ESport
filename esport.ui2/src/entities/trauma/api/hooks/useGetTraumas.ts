import { useQuery } from "@tanstack/react-query";
import { traumaApiKeys } from "./traumaApiKeys";
import { ApiContext } from "@/shared/types";
import { TraumaApi } from "../TraumaApi";

export const getTraumas = async (ctx?: ApiContext) => {
  try {
    const data = await TraumaApi(ctx).getTraumas();
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetTraumas = () => {
  return useQuery({
    queryKey: traumaApiKeys.getAllTraumas(),
    queryFn: () => getTraumas(),
  });
};
