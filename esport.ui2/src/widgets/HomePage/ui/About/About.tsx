import React, { FC } from "react";
import styles from "./About.module.css";
import { useTranslation } from "next-i18next";

import { SubTitle, Title } from "@/shared/ui";
import { useScrollTop } from "@/shared/lib";

import { Blur } from "../Blur/Blur";
import { PromoCard } from "../PromoCard/PromoCard";
import { TryNowButton } from "../TryNowButton/TryNowButton";
import { Selected } from "../Selected/Selected";

interface AboutProps {
  className?: string;
}

export const About: FC<AboutProps> = ({ className }) => {
  const { t } = useTranslation("home");
  const scrollTop = useScrollTop();

  return (
    <div className={styles.wrapper}>
      <Blur
        className={"right-[15px]"}
        absolute
        style={{
          top: `${scrollTop * 0.4}px`,
          right: `${15 + scrollTop / 6}px`,
        }}
      />
      <SubTitle size={"extra-large"} center className={"mb-10"}>
        {t("about.subtitle.first")}{" "}
        <Selected>{t("about.subtitle.second")}</Selected>{" "}
        {t("about.subtitle.third")}{" "}
        <Selected>{t("about.subtitle.fourth")}</Selected>
      </SubTitle>
      <div
        className={"container flex flex-wrap gap-3 text-center justify-center"}
      >
        <PromoCard>
          {t("about.promo.questionDo")}{" "}
          <Selected>{t("about.promo.you")}</Selected> {t("about.promo.first")}
        </PromoCard>
        <PromoCard>
          {t("about.promo.questionAre")}{" "}
          <Selected>{t("about.promo.you")}</Selected> {t("about.promo.second")}
        </PromoCard>
        <PromoCard>
          {t("about.promo.questionAre")}{" "}
          <Selected>{t("about.promo.you")}</Selected> {t("about.promo.third")}
        </PromoCard>
        <PromoCard>
          {t("about.promo.questionDo")}{" "}
          <Selected>{t("about.promo.you")}</Selected> {t("about.promo.fourth")}
        </PromoCard>
        <PromoCard>
          {t("about.promo.questionDo")}{" "}
          <Selected>{t("about.promo.you")}</Selected> {t("about.promo.fifth")}
        </PromoCard>
        <PromoCard>
          {t("about.promo.questionDo")}{" "}
          <Selected>{t("about.promo.you")}</Selected> {t("about.promo.sixth")}
        </PromoCard>
      </div>
      <Title center size={"extra-large"} className={"mt-20"}>
        {t("about.title.first")}{" "}
        <Selected>{t("about.title.selected")}</Selected>
      </Title>
      <div className={"flex flex-col justify-center mt-4 gap-5 mx-[40%]"}>
        <TryNowButton />
      </div>
    </div>
  );
};
