import React, { FC, ReactNode } from "react";
import styles from "./ProfileDataForm.module.css";

import { BoldText, InputBase, TextAreaBase } from "@/shared/ui";

export interface ProfileDataFormProps {
  name?: string;
  surname?: string;
  email?: string;
  telephoneNumber?: string;

  onChangeName: (name: string) => void;
  onChangeSurname: (surname: string) => void;
  onChangeEmail: (email: string) => void;
  onChangeTelephoneNumber: (telephoneNumber: string) => void;
  onChangeBio?: (bio: string) => void;

  withBio?: boolean;
  namePrefix?: string;

  className?: string;
  additionalFieldsBelow?: ReactNode;
  additionalFieldsAbove?: ReactNode;
  label?: string;
}

export const ProfileDataForm: FC<ProfileDataFormProps> = ({
  className,
  additionalFieldsBelow,
  additionalFieldsAbove,
  namePrefix = "profile",
  label,
  onChangeTelephoneNumber,
  onChangeEmail,
  onChangeName,
  onChangeSurname,
  onChangeBio,
  telephoneNumber = "",
  email = "",
  surname = "",
  name = "",
  withBio,
}) => {
  const onChange =
    (cb?: (data: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      cb?.(e.target.value);
    };

  return (
    <div className={className}>
      {label && <BoldText className={styles.title}>{label}</BoldText>}
      {additionalFieldsAbove}
      <div className={styles.name_wrapper}>
        <InputBase
          name={`${namePrefix}_name`}
          label={"Name"}
          value={name}
          onChange={onChange(onChangeName)}
          className={styles.input}
        />
        <InputBase
          name={`${namePrefix}_surname`}
          value={surname}
          label={"Surname"}
          onChange={onChange(onChangeSurname)}
          className={styles.input}
        />
      </div>
      <InputBase
        name={`${namePrefix}_email`}
        value={email}
        label={"Email"}
        onChange={onChange(onChangeEmail)}
      />
      <InputBase
        name={`${namePrefix}_telephoneNumber`}
        value={telephoneNumber}
        label={"Telephone number"}
        onChange={onChange(onChangeTelephoneNumber)}
      />
      {withBio && (
        <TextAreaBase placeholder={"Bio..."} onChange={onChange(onChangeBio)} />
      )}
      {additionalFieldsBelow}
    </div>
  );
};
