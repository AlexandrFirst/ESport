import React, { FC } from "react";
import styles from "./Hero.module.css";

import { useTranslation } from "next-i18next";
import { useScrollTop } from "@/shared/lib";

import { SubTitle, Title } from "@/shared/ui";
import { Blur } from "../Blur/Blur";
import { TryNowButton } from "../TryNowButton/TryNowButton";

interface HeroProps {
  className?: string;
}

export const Hero: FC<HeroProps> = ({ className }) => {
  const { t } = useTranslation("home");
  const scrollTop = useScrollTop();

  return (
    <div className={styles.wrapper}>
      <Blur
        absolute
        className={"top-[250px] left-[50px]"}
        style={{ left: `${50 + scrollTop}px` }}
      />
      <Blur
        absolute
        className={"top-[150px] right-[100px]"}
        style={{ right: `${100 + scrollTop / 2}px` }}
      />
      <Blur
        absolute
        size={"small"}
        className={"top-[10vh] left-[35%]"}
        style={{ right: `${100 + scrollTop / 2}px` }}
      />
      <Title center size={"extra-large"}>
        <span className={styles.accent_text}>{t("title.selected")}</span>
        {t("title.other")}
      </Title>
      <SubTitle center size={"extra-large"} className={"mt-8"}>
        <span className={styles.accent_text}>{t("slogan.selected")}</span>{" "}
        {t("slogan.other")}
      </SubTitle>
      <div className={styles.btn_container}>
        <TryNowButton />
      </div>
    </div>
  );
};
