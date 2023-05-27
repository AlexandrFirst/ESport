import { buildSelector } from "@/shared/lib";

export const [useSelectTrainerSports, selectTrainerSports] = buildSelector(
  (state) => state.roleProfileInformation.trainerSports
);
