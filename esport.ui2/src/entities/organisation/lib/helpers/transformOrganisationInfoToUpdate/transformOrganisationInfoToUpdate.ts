import { UpdateOrganisationRequest } from "../../../api/types/types";
import { IEditOrganisationForm } from "../../../model/types/update-organisation";

export const transformOrganisationInfoToUpdate = (
  data: IEditOrganisationForm & { organisationId: number }
): UpdateOrganisationRequest => {
  return {
    organisationId: data.organisationId,
    organisationInfo: {
      name: data.name,
      description: data.description,
    },
    organisationGyms: data.gymList.map((g) => ({
      name: g.name,
      address: g.address,
      closeTime: g.closeTime,
      openTime: g.openTime,
      id: g.gymId ?? 0,
    })),
  };
};
