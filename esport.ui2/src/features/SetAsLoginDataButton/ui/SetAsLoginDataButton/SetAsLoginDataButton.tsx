import { FC } from "react";

import cn from "classnames";

import { Button } from "@/shared/ui";

import { IProfile, ProfileApi } from "@/entities/profile";
import { mapProfileKeyToUserTypeEntity } from "../../lib/helpers/mapProfileKeyToUserTypeEntity/mapProfileKeyToUserTypeEntity";
import { getApiError, useSnackbar } from "@/shared/lib";
import { useConfirmInfo } from "../../lib/hooks/useConfirmInfo";

interface SetAsLoginDataButtonProps {
  className?: string;
  profileKey: keyof Omit<IProfile, "userIdentityInfo">;
  userId?: number;
  forCurrentUser?: boolean;
  disabled?: boolean;
}

export const SetAsLoginDataButton: FC<SetAsLoginDataButtonProps> = ({
  className,
  profileKey,
  userId,
  forCurrentUser,
  disabled,
}) => {
  const { showError, showSuccess } = useSnackbar();

  const isConfirmed = useConfirmInfo({ profileKey, userId, forCurrentUser });

  const handleSetAsLoginData = async () => {
    try {
      const api = await ProfileApi();
      await api.setAsLoginData({
        userTypeProfile: mapProfileKeyToUserTypeEntity(profileKey),
      });
      showSuccess(
        "Login data was set successfully. You can use it to login now."
      );
    } catch (e) {
      showError(getApiError(e));
    }
  };

  return (
    <div className={cn("flex justify-end", className)}>
      <Button
        disabled={disabled || !isConfirmed}
        onClick={handleSetAsLoginData}
      >
        Set as login data
      </Button>
    </div>
  );
};
