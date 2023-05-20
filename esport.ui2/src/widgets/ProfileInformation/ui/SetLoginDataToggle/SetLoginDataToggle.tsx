import React, { FC } from "react";
import styles from "./SetLoginDataToggle.module.css";

import { Toggle } from "@/shared/ui";

import { IProfile } from "@/entities/profile";
import { useProfileInformationActions } from "../../model/slices/ProfileInformationSlice";
import { useSelectOverrideLoginInfo } from "../../model/selectors/selectOverrideLoginInfo/selectOverrideLoginInfo";

interface SetLoginDataToggleProps {
  currentProfile: keyof IProfile;
  className?: string;
}

export const SetLoginDataToggle: FC<SetLoginDataToggleProps> = ({
  className,
  currentProfile,
}) => {
  const { setOverrideProfile } = useProfileInformationActions();
  const overrideLoginInfo = useSelectOverrideLoginInfo();
  const getOverrideLoginData = (current: keyof IProfile) => {
    return overrideLoginInfo === current;
  };

  const setOverrideLoginData = (current: keyof IProfile) => (b: boolean) => {
    setOverrideProfile(b ? current : null);
  };

  return (
    <div className={styles.wrapper}>
      <Toggle
        label={"Set as login data"}
        enabled={getOverrideLoginData(currentProfile)}
        setEnabled={setOverrideLoginData(currentProfile)}
        bold
      />
    </div>
  );
};
