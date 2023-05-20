import { buildSelector } from "@/shared/lib";

export const [useSelectOverrideLoginInfo, selectOverrideLoginInfo] =
  buildSelector(
    ({ profileInformation }) => profileInformation.overrideLoginInfo
  );
