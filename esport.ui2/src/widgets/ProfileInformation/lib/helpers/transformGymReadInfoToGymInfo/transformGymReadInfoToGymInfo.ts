import { IGymInfo, IGymReadInfo } from "@/entities/gym";

export const transformGymReadInfoToGymInfo = (
  gyms: IGymReadInfo[]
): IGymInfo[] => {
  return gyms.map((gym) => ({
    name: gym.name,
    gymId: gym.gymId,
    address: gym.address,
    closeTime: gym.closeTime,
    openTime: gym.onenTime,
    organisationName: "",
    gymOrganisationId: gym.organisationId,
  }));
};
