import { Card } from "@/shared/ui";
import React, { memo } from "react";
import styles from "./AboutInfo.module.css";

import cn from "classnames";
import { useTranslation } from "next-i18next";

import { FireIcon, FlagIcon, UserIcon } from "@heroicons/react/24/solid";

import { IProfileInfo } from "../../model/types/profile";

import { CardSubTitle } from "../CardSubTitle/CardSubTitle";

import { AboutInfoItem } from "./AboutInfoItem";

interface AboutInfoProps {
  profile?: Pick<IProfileInfo, "name" | "surname" | "email" | "info">;
  className?: string;
}

const AboutInfo: React.FC<AboutInfoProps> = ({ profile, className }) => {
  const { name, info, email, surname } = profile || {};
  const { t } = useTranslation("profile");

  return (
    <Card className={cn(styles.wrapper, className)}>
      <CardSubTitle>{t("about")}</CardSubTitle>
      <div className={styles.info}>
        <ul className={styles.list}>
          <AboutInfoItem
            icon={UserIcon}
            boldText={t("fullName")}
            semiBoldText={`${name} ${surname}`}
          />
          <AboutInfoItem
            icon={FireIcon}
            boldText={t("level")}
            semiBoldText={email}
          />
          <AboutInfoItem
            icon={FlagIcon}
            boldText={t("country")}
            semiBoldText={info ?? ""}
          />
          {/*<AboutContacts contacts={contacts} />*/}
        </ul>
      </div>
    </Card>
  );
};

export default memo(AboutInfo);
