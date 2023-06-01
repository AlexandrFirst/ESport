import { IGymInfo, IGymReadInfo } from "@/entities/gym";

export const transformGymInfoToGymReadInfo = (
  gyms: IGymInfo[]
): IGymReadInfo[] => {
  return gyms.map((gym) => ({
    name: gym.name,
    gymId: gym.gymId ?? 0,
    onenTime: gym.openTime,
    closeTime: gym.closeTime,
    organisationId: 0,
    address: gym.address,
    gymTrainerInfos: [],
    gymSports: [],
  }));
};
