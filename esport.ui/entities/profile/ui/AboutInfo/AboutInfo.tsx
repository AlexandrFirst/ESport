import React, { memo } from "react";
import styles from "./AboutInfo.module.scss";

import cn from "classnames";
import { useTranslation } from "next-i18next";

import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import FlagIcon from "@mui/icons-material/Flag";

import { SportCard } from "@shared/ui/SportCard/SportCard";

import { Profile } from "../../types/profile.type";
import { CardSubTitle } from "../CardSubTitle/CardSubTitle";

import { AboutInfoItem } from "./AboutInfoItem";
import { AboutContacts } from "./AboutContacts";

interface AboutInfoProps {
  profile: Profile;
  className?: string;
}

const AboutInfo: React.FC<AboutInfoProps> = ({ profile, className }) => {
  const { fullName, level, country, contacts } = profile;
  const { t } = useTranslation("profile");

  return (
    <SportCard className={cn(styles.wrapper, className)}>
      <CardSubTitle>{t("about")}</CardSubTitle>
      <div className={styles.info}>
        <ul className={styles.list}>
          <AboutInfoItem
            icon={<AssignmentIndIcon className={styles.item} />}
            boldText={t("fullName")}
            semiBoldText={fullName}
          />
          <AboutInfoItem
            icon={<LocalFireDepartmentIcon className={styles.item} />}
            boldText={t("level")}
            semiBoldText={level}
          />
          <AboutInfoItem
            icon={<FlagIcon className={styles.item} />}
            boldText={t("country")}
            semiBoldText={country}
          />
          <AboutContacts contacts={contacts} />
        </ul>
      </div>
    </SportCard>
  );
};

export default memo(AboutInfo);
