import React, { memo } from "react";
import styles from "./OverviewInfo.module.css";

import {
  ArrowRightOnRectangleIcon,
  FireIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

import { Icon, Title } from "@/shared/ui";

interface OverviewInfoProps {
  fullName?: string;
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
      <Title className={styles.profile_name}>{fullName}</Title>
      <ul className={styles.lower_info}>
        {level && (
          <li className={styles.lower_info_item}>
            <Icon Svg={FireIcon} className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{level}</h5>
          </li>
        )}
        {location && (
          <li className={styles.lower_info_item}>
            <Icon Svg={MapPinIcon} className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{location}</h5>
          </li>
        )}
        {lastLogin && (
          <li className={styles.lower_info_item}>
            <Icon
              Svg={ArrowRightOnRectangleIcon}
              className={styles.lower_info_icon}
            />
            <h5 className={styles.lower_info_text}>{lastLogin}</h5>
          </li>
        )}
      </ul>
    </main>
  );
};

export default memo(OverviewInfo);
