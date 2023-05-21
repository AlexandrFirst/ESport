import { buildSelector } from "@/shared/lib";

export const [useSelectCurrentProfile, selectCurrentProfile] = buildSelector(
  ({ profileInformation }) => profileInformation.currentProfile
);
