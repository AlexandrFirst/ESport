import { Card } from "@/shared/ui";
import React, { memo } from "react";
import styles from "./AboutInfo.module.css";

import cn from "classnames";
import { useTranslation } from "next-i18next";

import { FireIcon, FlagIcon, UserIcon } from "@heroicons/react/24/solid";

import { IProfile } from "../../model/types/profile";

import { CardSubTitle } from "../CardSubTitle/CardSubTitle";

import { AboutInfoItem } from "./AboutInfoItem";
import { AboutContacts } from "./AboutContacts";

interface AboutInfoProps {
  profile?: IProfile;
  className?: string;
}

const AboutInfo: React.FC<AboutInfoProps> = ({ profile, className }) => {
  const { fullName, level, country, contacts } = profile || {};
  const { t } = useTranslation("profile");

  return (
    <Card className={cn(styles.wrapper, className)}>
      <CardSubTitle>{t("about")}</CardSubTitle>
      <div className={styles.info}>
        <ul className={styles.list}>
          <AboutInfoItem
            icon={UserIcon}
            boldText={t("fullName")}
            semiBoldText={fullName}
          />
          <AboutInfoItem
            icon={FireIcon}
            boldText={t("level")}
            semiBoldText={level}
          />
          <AboutInfoItem
            icon={FlagIcon}
            boldText={t("country")}
            semiBoldText={country}
          />
          <AboutContacts contacts={contacts} />
        </ul>
      </div>
    </Card>
  );
};

export default memo(AboutInfo);
