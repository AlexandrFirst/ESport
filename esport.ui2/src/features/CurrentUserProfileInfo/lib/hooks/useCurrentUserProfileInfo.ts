import { useAuth } from "@/entities/user";
import { useProfileInfo, UseProfileInfoParams } from "@/entities/profile";

interface UseCurrentUserProfileInfoProps
  extends Omit<UseProfileInfoParams, "userId"> {}

export const useCurrentUserProfileInfo = (
  params?: UseCurrentUserProfileInfoProps
) => {
  const { userId } = useAuth();
  return useProfileInfo({
    ...params,
    userId,
  });
};
