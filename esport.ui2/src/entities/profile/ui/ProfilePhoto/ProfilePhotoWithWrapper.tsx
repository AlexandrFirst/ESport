import React, { FC } from "react";

import { ProfilePhoto, ProfilePhotoProps } from "./ProfilePhoto";
import { ProfilePhotoWrapper } from "./ProfilePhotoWrapper";

interface ProfilePhotoWithWrapperProps extends ProfilePhotoProps {}

export const ProfilePhotoWithWrapper: FC<ProfilePhotoWithWrapperProps> = ({
  className,
  size,
  ...props
}) => {
  return (
    <ProfilePhotoWrapper className={className} size={size}>
      <ProfilePhoto {...props} />
    </ProfilePhotoWrapper>
  );
};
