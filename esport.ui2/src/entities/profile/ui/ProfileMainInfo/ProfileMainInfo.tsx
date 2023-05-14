import React from "react";
import styles from "./ProfileMainInfo.module.css";

import { Card } from "@/shared/ui";

import { IOldProfileToRemove } from "../../model/types/profile";

import { EditableProfilePhoto } from "../ProfilePhoto/EditableProfilePhoto";
import PhotoBanner from "../PhotoBanner/PhotoBanner";
import OverviewInfo from "../OverviewInfo/OverviewInfo";

interface ProfileMainInfoProps {
  profile?: IOldProfileToRemove;
  editable?: boolean;
}

const ProfileMainInfo: React.FC<ProfileMainInfoProps> = ({
  profile,
  editable,
}) => {
  const {
    avatarImage = "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/avatars/1.png",
    bannerImage = "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/pages/profile-banner.png",
    ...profileInfo
  } = profile || {};

  return (
    <Card className={styles.card_content} padding={"lg"}>
      <PhotoBanner src={bannerImage} />
      <div className={styles.profile_info}>
        <EditableProfilePhoto
          src={avatarImage}
          size={"lg"}
          className={styles.profile_photo}
          editable={editable}
        />
        <OverviewInfo {...profileInfo} />
      </div>
    </Card>
  );
};

export default ProfileMainInfo;
