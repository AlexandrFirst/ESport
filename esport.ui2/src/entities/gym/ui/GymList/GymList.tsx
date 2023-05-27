import React, { FC } from "react";
import styles from "./GymList.module.css";

import { IGymReadInfo } from "../../model/types/gym-read-info";

import { GymListItem } from "./GymListItem";

interface GymListProps {
  className?: string;
  gyms: IGymReadInfo[];
}

export const GymList: FC<GymListProps> = ({ className, gyms }) => {
  return (
    <ul className={styles.wrapper}>
      {gyms.map((gym) => (
        <GymListItem key={gym.gymId} gym={gym} />
      ))}
    </ul>
  );
};
