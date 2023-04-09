import React, { memo } from "react";
import styles from "./ProfileMainInfo.module.scss";

import { SportCard } from "@shared/ui/SportCard/SportCard";

import { Profile } from "../../types/profile.type";

import PhotoBanner from "../PhotoBanner/PhotoBanner";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto";
import OverviewInfo from "../OverviewInfo/OverviewInfo";

interface ProfileMainInfoProps {
  profile: Profile;
}

const ProfileMainInfo: React.FC<ProfileMainInfoProps> = ({ profile }) => {
  const {
    avatarImage = "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/avatars/1.png",
    bannerImage = "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/pages/profile-banner.png",
    ...profileInfo
  } = profile;

  return (
    <SportCard cardContentClassName={styles.card_content}>
      <PhotoBanner src={bannerImage} />
      <div className={styles.profile_info}>
        <ProfilePhoto
          src={avatarImage}
          size={"lg"}
          className={styles.profile_photo}
        />
        <OverviewInfo {...profileInfo} />
      </div>
    </SportCard>
  );
};

export default memo(ProfileMainInfo);
