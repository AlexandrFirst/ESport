import React, { FC } from "react";
import styles from "./ProfileMainInfo.module.css";

import { PencilSquareIcon } from "@heroicons/react/24/solid";

import { Card, IconButton } from "@/shared/ui";

import { IProfile } from "../../model/types/profile";

import PhotoBanner from "../PhotoBanner/PhotoBanner";
import { EditableProfilePhoto } from "../ProfilePhoto/EditableProfilePhoto";
import { OverviewInfo } from "../OverviewInfo/OverviewInfo";

interface ProfileMainInfoProps {
  profile?: IProfile | null;
  editable?: boolean;
  onEditClick?: () => void;
  withEditBtn?: boolean;
}

export const ProfileMainInfo: FC<ProfileMainInfoProps> = ({
  profile,
  editable,
  onEditClick,
  withEditBtn,
}) => {
  const { userIdentityInfo } = profile || {};

  const fullname =
    `${userIdentityInfo?.name} ${userIdentityInfo?.surname}` || "";

  return (
    <Card className={styles.card_content} padding={"lg"}>
      <PhotoBanner />
      <div className={styles.profile_info}>
        <EditableProfilePhoto
          size={"lg"}
          className={styles.profile_photo}
          editable={editable}
        />
        <OverviewInfo
          fullName={fullname}
          email={userIdentityInfo?.email}
          phone={userIdentityInfo?.telephoneNumber}
        />
      </div>
      {withEditBtn && (
        <div className={styles.edit_btn_wrapper}>
          <IconButton
            Svg={PencilSquareIcon}
            iconSize={"l"}
            onClick={onEditClick}
          />
        </div>
      )}
    </Card>
  );
};
