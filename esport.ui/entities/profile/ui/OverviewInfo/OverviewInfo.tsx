import React, { memo } from "react";
import styles from "./OverviewInfo.module.scss";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LoginIcon from "@mui/icons-material/Login";

import { SportTitle } from "@shared/ui/SportTitle/SportTitle";

interface OverviewInfoProps {
  fullName: string;
  location?: string;
  level?: string;
  lastLogin?: string;
}

const OverviewInfo: React.FC<OverviewInfoProps> = ({
  fullName,
  location,
  level,
  lastLogin,
}) => {
  return (
    <main className={styles.wrapper}>
      <SportTitle className={styles.profile_name}>{fullName}</SportTitle>
      <ul className={styles.lower_info}>
        {level && (
          <li className={styles.lower_info_item}>
            <LocalFireDepartmentIcon className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{level}</h5>
          </li>
        )}
        {location && (
          <li className={styles.lower_info_item}>
            <LocationOnIcon className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{location}</h5>
          </li>
        )}
        {lastLogin && (
          <li className={styles.lower_info_item}>
            <LoginIcon className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{lastLogin}</h5>
          </li>
        )}
      </ul>
    </main>
  );
};

export default memo(OverviewInfo);
