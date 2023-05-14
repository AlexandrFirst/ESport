import { buildSelector } from "@/shared/lib";

export const [useSelectProfile, selectProfile] = buildSelector(
  (state) => state.profile.data
);
