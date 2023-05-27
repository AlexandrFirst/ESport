import { ICreateOrganisation } from "../../model/types/create-organisation";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { organisationApiKeys } from "./organisationApiKeys";
import { OrganisationApi } from "../..";

export const useCreateOrganisation = (
  options?: UseMutationOptions<any, unknown, ICreateOrganisation>
) => {
  return useMutation({
    mutationKey: organisationApiKeys.createOrganisation(),
    mutationFn: async (request: ICreateOrganisation) => {
      try {
        const { data } = await OrganisationApi().create(request);
        return data;
      } catch (e) {
        throw e;
      }
    },
    ...options,
  });
};
