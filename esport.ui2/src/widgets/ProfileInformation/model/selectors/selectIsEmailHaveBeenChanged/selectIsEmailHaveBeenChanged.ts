import { buildSelector } from "@/shared/lib";

export const [useSelectIsEmailHaveBeenChanged, selectIsEmailHaveBeenChanged] =
  buildSelector((state) => state.profileInformation.isEmailForProfileChanged);
