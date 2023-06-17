import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { UpdateOrganisationRequest } from "../types/types";

import { OrganisationApi } from "../../api/organisationApi";

import { organisationApiKeys } from "./organisationApiKeys";

export const useUpdateOrganisation = (
  options?: UseMutationOptions<any, unknown, UpdateOrganisationRequest>
) => {
  return useMutation({
    mutationKey: organisationApiKeys.updateOrganisation(),
    mutationFn: async (request: UpdateOrganisationRequest) => {
      try {
        const api = await OrganisationApi();
        const { data } = await api.update(request);
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
