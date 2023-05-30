import React, { FC } from "react";
import styles from "./GymList.module.css";

import { IGymReadInfo } from "../../model/types/gym-read-info";

import { GymListItem, GymListItemProps } from "./GymListItem";

interface GymListProps extends Omit<GymListItemProps, "gym"> {
  className?: string;
  gyms: IGymReadInfo[];
}

export const GymList: FC<GymListProps> = ({ className, gyms, ...props }) => {
  return (
    <ul className={styles.wrapper}>
      {gyms.map((gym) => (
        <GymListItem {...props} key={gym.gymId} gym={gym} />
      ))}
    </ul>
  );
};
