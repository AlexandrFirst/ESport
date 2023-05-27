import { FC } from "react";
import styles from "./GymList.module.css";

import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { Icon } from "@/shared/ui";

import { IGymReadInfo } from "../../model/types/gym-read-info";

interface GymListItemProps {
  className?: string;
  gym: IGymReadInfo;
}

export const GymListItem: FC<GymListItemProps> = ({ gym }) => {
  return (
    <li className={styles.list_item}>
      {/*<Image src={} alt={} />*/}
      <div className={styles.photo}>Photo</div>
      <div className={styles.info}>
        <span className={"mt-2"}>Address: {gym.address}</span>
        <div className={"flex flex-col"}>
          <span className={styles.time}>Opened: {gym.onenTime}</span>
          <span className={styles.closed}>Closed: {gym.closeTime}</span>
        </div>
      </div>
      <div className={"ml-6 flex flex-col justify-end font-semibold"}>
        <span>Sports:</span>
        <ul>
          {gym.gymSports.map((sport) => (
            <li key={sport.id} className={"flex items-center gap-2"}>
              <Icon Svg={UserGroupIcon} />
              {sport.name}
            </li>
          ))}
        </ul>
      </div>
      <div className={"flex flex-col justify-end font-semibold ml-10"}>
        <ul>
          Trainers:
          {gym.gymTrainerInfos.map((trainer) => (
            <li key={trainer.id} className={"flex items-center gap-2"}>
              <Icon Svg={UserIcon} />
              {trainer.name}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
};
