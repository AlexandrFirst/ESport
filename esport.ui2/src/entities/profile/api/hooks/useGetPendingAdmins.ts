import { ProfileApi, profileApiKeys } from "../..";
import {
  GetPendingAdminsRequest,
  GetPendingAdminsResponse,
} from "../types/types";
import { ApiContext } from "@/shared/types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const getPendingAdmins = async (
  request: GetPendingAdminsRequest,
  ctx?: ApiContext
) => {
  try {
    const api = await ProfileApi(ctx);
    const { data } = await api.getPendingAdmins(request);
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetPendingAdmins = (
  request: GetPendingAdminsRequest,
  options?: UseQueryOptions<GetPendingAdminsResponse>
) => {
  return useQuery({
    queryKey: profileApiKeys.getPendingAdmins(request.adminType),
    queryFn: () => getPendingAdmins(request),
    ...options,
  });
};
