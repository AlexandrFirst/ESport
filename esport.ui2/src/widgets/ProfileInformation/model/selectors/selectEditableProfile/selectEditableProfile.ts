import { buildSelector } from "@/shared/lib";

export const [useSelectEditableProfile, selectEditableProfile] = buildSelector(
  ({ profileInformation }) => profileInformation.editableProfile
);
