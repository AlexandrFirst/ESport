import React from "react";
import styles from "./AboutInfo.module.scss";

import { useTranslation } from "next-i18next";

import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

import { ProfileContacts } from "../../types/profile-contacts.type";
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
        icon={<LocalPhoneIcon className={styles.item} />}
        boldText={t("phone")}
        semiBoldText={phone?.title}
        link={phone?.link}
      />
      <AboutInfoItem
        icon={<EmailIcon className={styles.item} />}
        boldText={t("email")}
        semiBoldText={email?.title}
        link={email?.link}
      />
      <AboutInfoItem
        icon={<EmailIcon className={styles.item} />}
        boldText={t("email")}
        semiBoldText={youtube?.title}
        link={youtube?.link}
      />
      <AboutInfoItem
        icon={<EmailIcon className={styles.item} />}
        boldText={t("email")}
        semiBoldText={twitch?.title}
        link={twitch?.link}
      />
      <AboutInfoItem
        icon={<EmailIcon className={styles.item} />}
        boldText={t("email")}
        semiBoldText={skype?.title}
        link={skype?.link}
      />
      <AboutInfoItem
        icon={<InstagramIcon className={styles.item} />}
        boldText={t("instagram")}
        semiBoldText={instagram?.title}
        link={instagram?.link}
      />
      <AboutInfoItem
        icon={<TelegramIcon className={styles.item} />}
        boldText={t("telegram")}
        semiBoldText={telegram?.title}
        link={telegram?.link}
      />
      <AboutInfoItem
        icon={<EmailIcon className={styles.item} />}
        boldText={t("email")}
        semiBoldText={twitter?.title}
        link={twitter?.link}
      />
      <AboutInfoItem
        icon={<EmailIcon className={styles.item} />}
        boldText={t("email")}
        semiBoldText={facebook?.title}
        link={facebook?.link}
      />
    </>
  );
};
