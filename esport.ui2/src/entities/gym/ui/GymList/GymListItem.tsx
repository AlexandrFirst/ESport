import { FC } from "react";
import styles from "./GymList.module.css";

import UserGroupIcon from "@heroicons/react/24/solid/UserGroupIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";

import { Icon } from "@/shared/ui";

import { IGymReadInfo } from "../../model/types/gym-read-info";
import cn from "classnames";
import { getTimeFromTimeSpan, uniqueObjectsArray } from "@/shared/lib";

export interface GymListItemProps {
  className?: string;
  gym: IGymReadInfo;
  onClickGym?: (gym: IGymReadInfo) => void;
}

export const GymListItem: FC<GymListItemProps> = ({ gym, onClickGym }) => {
  const handleClick = () => onClickGym?.(gym);

  // const trainers = Array.from(new Set(gym.gymTrainerInfos.map((t) => t.id)));

  const trainers = uniqueObjectsArray(gym.gymTrainerInfos, "id");
  const sports = uniqueObjectsArray(gym.gymSports, "id");

  return (
    <li
      className={cn(styles.list_item, {
        [styles.clickable]: Boolean(onClickGym),
      })}
      onClick={handleClick}
    >
      {/*<Image src={} alt={} />*/}
      <div className={styles.photo}>Photo</div>
      <div className={styles.info}>
        <span className={"mt-5"}>
          {gym.name} ({gym.address})
        </span>
        <div className={"flex flex-col"}>
          <span className={styles.time}>
            Opened: {getTimeFromTimeSpan(gym.onenTime)}
          </span>
          <span className={styles.closed}>
            Closed: {getTimeFromTimeSpan(gym.closeTime)}
          </span>
        </div>
      </div>
      <div className={"ml-6 flex flex-col justify-end font-semibold"}>
        <span>Sports:</span>
        <ul>
          {!!sports.length ? (
            sports.map((sport) => (
              <li key={sport.id} className={"flex items-center gap-2"}>
                <Icon Svg={UserGroupIcon} />
                {sport.name}
              </li>
            ))
          ) : (
            <li>--</li>
          )}
        </ul>
      </div>
      <div className={"flex flex-col justify-end font-semibold ml-10"}>
        <ul>
          Trainers:
          {!!trainers.length ? (
            trainers.map((trainer) => (
              <li key={trainer.id} className={"flex items-center gap-2"}>
                <Icon Svg={UserIcon} />
                {trainer.name}
              </li>
            ))
          ) : (
            <li>--</li>
          )}
        </ul>
      </div>
    </li>
  );
};
