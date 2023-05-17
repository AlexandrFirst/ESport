import React, { FC, ReactNode } from "react";
import styles from "./ProfileDataForm.module.css";

import { BoldText, Input, InputBase } from "@/shared/ui";

import { IProfileInfo } from "../../model/types/profile";

export interface ProfileDataFormProps {
  profile?: Pick<
    IProfileInfo,
    "name" | "surname" | "email" | "telephoneNumber"
  >;
  namePrefix?: string;
  className?: string;
  additionalFields?: ReactNode;
  label?: string;
}

export const ProfileDataForm: FC<ProfileDataFormProps> = ({
  className,
  namePrefix = "",
  profile,
  additionalFields,
  label,
}) => {
  const {
    name = "",
    surname = "",
    telephoneNumber = "",
    email = "",
  } = profile || {};

  console.log("===profile===", profile);

  return (
    <div className={className}>
      {label && <BoldText className={styles.title}>{label}</BoldText>}
      <InputBase name={`${namePrefix}_name`} label={"Name"} />
      <Input
        name={`${namePrefix}_surname`}
        defaultValue={surname}
        label={"Surname"}
      />
      <Input
        name={`${namePrefix}_email`}
        defaultValue={email}
        label={"Email"}
      />
      <Input
        name={`${namePrefix}_telephoneNumber`}
        defaultValue={telephoneNumber}
        label={"Telephone number"}
      />
      {additionalFields}
    </div>
  );
};
