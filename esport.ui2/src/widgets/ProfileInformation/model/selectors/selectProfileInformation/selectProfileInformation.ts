import { buildSelector } from "@/shared/lib";

export const [useSelectProfileInformation, selectProfileInformation] =
  buildSelector(({ profileInformation }) => profileInformation);
