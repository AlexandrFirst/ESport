import React, { FC } from "react";
import styles from "./GymReadInfo.module.css";

import { IGymReadInfo } from "../../model/types/gym-read-info";
import { getTimeFromTimeSpan } from "@/shared/lib";

interface GymReadInfoProps {
  className?: string;
  gym: IGymReadInfo;
}

export const GymReadInfo: FC<GymReadInfoProps> = ({ gym, className }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <div className={styles.infoItemTitle}>Title:</div>
          <div className={styles.infoItemValue}>{gym.name}</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoItemTitle}>Address:</div>
          <div className={styles.infoItemValue}>{gym.address}</div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoItemTitle}>Open time:</div>
          <div className={styles.infoItemValue}>
            {getTimeFromTimeSpan(gym.onenTime)}
          </div>
        </div>
        <div className={styles.infoItem}>
          <div className={styles.infoItemTitle}>Close time:</div>
          <div className={styles.infoItemValue}>
            {getTimeFromTimeSpan(gym.closeTime)}
          </div>
        </div>
      </div>
    </div>
  );
};
