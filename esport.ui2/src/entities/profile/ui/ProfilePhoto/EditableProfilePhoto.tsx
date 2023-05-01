import React, { FC } from "react";
import styles from "./ProfilePhoto.module.css";

import cn from "classnames";
import { FileUpload } from "@/shared/ui";

import { ProfilePhoto, ProfilePhotoProps } from "./ProfilePhoto";
import { ProfilePhotoWrapper } from "./ProfilePhotoWrapper";

interface EditableProfilePhotoProps extends ProfilePhotoProps {
  editable?: boolean;
  onChange?: (file: File | null) => void;
}

export const EditableProfilePhoto: FC<EditableProfilePhotoProps> = ({
  onChange,
  editable,
  className,
  size,
  ...props
}) => {
  const contnet = <ProfilePhoto {...props} />;

  return (
    <ProfilePhotoWrapper
      size={size}
      className={cn(className, { [styles.editable]: editable })}
    >
      {editable ? (
        <FileUpload onFileChange={onChange}>{contnet}</FileUpload>
      ) : (
        contnet
      )}
    </ProfilePhotoWrapper>
  );
};
