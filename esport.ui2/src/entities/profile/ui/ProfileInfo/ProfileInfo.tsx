import React, { FC } from "react";

import { useTranslation } from "next-i18next";

import { useMappedRoles } from "@/shared/lib";
import { Card, RegularText } from "@/shared/ui";

import { AtSymbolIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/solid";

import { UserRole } from "@/shared/constants";
import { IProfileInfo } from "../../model/types/profile";

import { CardSubTitle } from "../CardSubTitle/CardSubTitle";
import { AboutInfoItem } from "../AboutInfo/AboutInfoItem";

interface ProfileInfoProps {
  profileInfo?: IProfileInfo;
  role?: UserRole;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  profileInfo,
  role = UserRole.Trainee,
}) => {
  const { t } = useTranslation();
  const translatedRole = useMappedRoles();

  return (
    <Card>
      <CardSubTitle>{translatedRole[role]}</CardSubTitle>
      {!profileInfo ? (
        <RegularText className={"mt-6"}>No data</RegularText>
      ) : (
        <>
          <AboutInfoItem
            icon={UserIcon}
            boldText={t("fullName")}
            semiBoldText={`${profileInfo.name} ${profileInfo.surname}`}
          />
          <AboutInfoItem
            icon={AtSymbolIcon}
            boldText={t("email")}
            semiBoldText={profileInfo.email}
          />
          <AboutInfoItem
            icon={PhoneIcon}
            boldText={t("telephone")}
            semiBoldText={profileInfo.telephoneNumber}
          />
        </>
      )}
    </Card>
  );
};
