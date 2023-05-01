import React from "react";

import { useTranslation } from "next-i18next";

import { AtSymbolIcon, DevicePhoneMobileIcon } from "@heroicons/react/24/solid";

import { ProfileContacts } from "../../model/types/profile-contacts";

import { CardSubTitle } from "../CardSubTitle/CardSubTitle";
import { AboutInfoItem } from "./AboutInfoItem";

interface AboutContactsProps {
  contacts?: ProfileContacts;
}

export const AboutContacts: React.FC<AboutContactsProps> = ({ contacts }) => {
  const {
    youtube,
    email,
    twitch,
    twitter,
    skype,
    instagram,
    telegram,
    facebook,
    phone,
  } = contacts || {};

  const { t } = useTranslation("profile");

  if (!contacts) return null;

  return (
    <>
      <CardSubTitle gap>{t("contacts")}</CardSubTitle>
      <AboutInfoItem
        icon={DevicePhoneMobileIcon}
        boldText={t("phone")}
        semiBoldText={phone?.title}
        link={phone?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("email")}
        semiBoldText={email?.title}
        link={email?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("email")}
        semiBoldText={youtube?.title}
        link={youtube?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("email")}
        semiBoldText={twitch?.title}
        link={twitch?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("email")}
        semiBoldText={skype?.title}
        link={skype?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("instagram")}
        semiBoldText={instagram?.title}
        link={instagram?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("telegram")}
        semiBoldText={telegram?.title}
        link={telegram?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("email")}
        semiBoldText={twitter?.title}
        link={twitter?.link}
      />
      <AboutInfoItem
        icon={AtSymbolIcon}
        boldText={t("email")}
        semiBoldText={facebook?.title}
        link={facebook?.link}
      />
    </>
  );
};
