import { useAppSelector } from "../hooks/store/useAppSelector";
import { selectDevice } from "@/shared/model";

export const useUserDevice = () => {
  const { isDesktop, isMobile } = useAppSelector(selectDevice);
  return { isDesktop, isMobile };
};
