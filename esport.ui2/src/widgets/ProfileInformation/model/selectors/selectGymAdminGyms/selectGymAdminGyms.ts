import { buildSelector } from "@/shared/lib";

export const [useSelectGymAdminGyms, selectGymAdminGyms] = buildSelector(
  (state) => state.roleProfileInformation.gymAdminGyms
);
