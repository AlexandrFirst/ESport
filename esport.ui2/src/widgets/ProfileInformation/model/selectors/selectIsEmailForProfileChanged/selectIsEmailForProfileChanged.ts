import { buildSelector } from "@/shared/lib";

import { IProfile } from "@/entities/profile";

export const [
  useSelectIsEmailForProfileChanged,
  selectIsEmailForProfileChanged,
] = buildSelector(
  (state, profileKey: keyof IProfile) =>
    state.profileInformation.isEmailForProfileChanged[profileKey]
);
