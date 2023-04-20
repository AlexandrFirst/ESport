import { useAppSelector } from "@/shared/lib";
import { selectDevice } from "@/shared/model";

export const useUserDevice = () => {
  const { isDesktop, isMobile } = useAppSelector(selectDevice);
  return { isDesktop, isMobile };
};
