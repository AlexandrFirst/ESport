import React, { FC } from "react";
import styles from "./Footer.module.css";

import { useTranslation } from "next-i18next";

import { RegularText } from "@/shared/ui";

interface FooterProps {
  className?: string;
}

export const MainPageFooter: FC<FooterProps> = ({ className }) => {
  const { t } = useTranslation("home");
  return (
    <footer className={styles.wrapper}>
      <RegularText>{t("footer")}</RegularText>
    </footer>
  );
};
