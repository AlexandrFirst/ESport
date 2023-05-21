import React, { FC } from "react";
import styles from "./ReadonlyProfileInfo.module.css";
import { IProfileInfo } from "../..";
import cn from "classnames";
import { Icon, IconSvg } from "@/shared/ui";

interface ReadonlyProfileInfoProps {
  profileInfo?: IProfileInfo;
  className?: string;
}

const ProfileInfoItem: FC<{
  label: string;
  value: string;
  icon?: IconSvg;
}> = ({ label, value, icon }) => {
  return (
    <li className={styles.list_item}>
      {icon && <Icon Svg={icon} />}
      <label className={styles.label}>{label}</label>
      <p>{value}</p>
    </li>
  );
};

export const ReadonlyProfileInfo: FC<ReadonlyProfileInfoProps> = ({
  profileInfo,
  className,
}) => {
  if (!profileInfo) return <div>No data</div>;
  return (
    <div className={cn(styles.wrapper, className)}>
      <ul className={styles.list}>
        <ProfileInfoItem label={"Name:"} value={profileInfo.name} />
        <ProfileInfoItem label={"Surname:"} value={profileInfo.surname} />
        <ProfileInfoItem label={"Email:"} value={profileInfo.email} />
        <ProfileInfoItem
          label={"Telephone number:"}
          value={profileInfo.telephoneNumber}
        />
      </ul>
    </div>
  );
};
