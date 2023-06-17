import { useQuery } from "@tanstack/react-query";
import { bodyPartApiKeys } from "./bodyPartApiKeys";
import { ApiContext } from "@/shared/types";
import { BodyPartApi } from "../BodyPartApi";

export const getBodyParts = async (ctx?: ApiContext) => {
  try {
    const api = await BodyPartApi(ctx);
    const data = await api.getBodyParts();
    return data;
  } catch (e) {
    throw e;
  }
};

export const useGetBodyParts = () => {
  return useQuery({
    queryKey: bodyPartApiKeys.getAllBodyParts(),
    queryFn: () => getBodyParts(),
  });
};
