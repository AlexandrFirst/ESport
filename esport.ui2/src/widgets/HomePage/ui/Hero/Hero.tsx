import React, { FC } from "react";
import styles from "./Hero.module.css";
import { SubTitle, Title } from "@/shared/ui";
import { useTranslation } from "next-i18next";
import { Blur } from "../Blur/Blur";
import { useScrollTop } from "@/shared/lib";
import { TryNowButton } from "../TryNowButton/TryNowButton";

interface HeroProps {
  className?: string;
}

export const Hero: FC<HeroProps> = ({ className }) => {
  const { t } = useTranslation("common");
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
        <span className={styles.accent_text}>E-S</span>port
      </Title>
      <SubTitle center size={"extra-large"} className={"mt-8"}>
        <span className={styles.accent_text}>Forge Your Legacy,</span> Dominate
        the Game
      </SubTitle>
      <div className={styles.btn_container}>
        <TryNowButton />
      </div>
    </div>
  );
};
