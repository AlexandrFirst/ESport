import React, { FC, ReactNode } from "react";
import styles from "./ProfileDataForm.module.css";
import { IProfileInfo } from "../..";
import { BoldText, Input } from "@/shared/ui";

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

  return (
    <div className={className}>
      {label && <BoldText className={styles.title}>{label}</BoldText>}
      <Input name={`${namePrefix}_name`} defaultValue={name} label={"Name"} />
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
