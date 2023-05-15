import React from "react";
import styles from "./OverviewInfo.module.css";

import { AtSymbolIcon, FireIcon, PhoneIcon } from "@heroicons/react/24/solid";

import { Icon, Title } from "@/shared/ui";

interface OverviewInfoProps {
  fullName?: string;
  phone?: string;
  email?: string;
  additionalInfo?: string;
}

export const OverviewInfo: React.FC<OverviewInfoProps> = ({
  fullName,
  phone,
  email,
  additionalInfo,
}) => {
  return (
    <main className={styles.wrapper}>
      <Title className={styles.profile_name}>{fullName}</Title>
      <ul className={styles.lower_info}>
        {email && (
          <li className={styles.lower_info_item}>
            <Icon Svg={AtSymbolIcon} className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{email}</h5>
          </li>
        )}
        {phone && (
          <li className={styles.lower_info_item}>
            <Icon Svg={PhoneIcon} className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{phone}</h5>
          </li>
        )}
        {additionalInfo && (
          <li className={styles.lower_info_item}>
            <Icon Svg={FireIcon} className={styles.lower_info_icon} />
            <h5 className={styles.lower_info_text}>{additionalInfo}</h5>
          </li>
        )}
      </ul>
    </main>
  );
};
