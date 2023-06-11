import React, { FC } from "react";
import styles from "./About.module.css";
import { SubTitle, Title } from "@/shared/ui";
import { Blur } from "../Blur/Blur";
import { PromoCard } from "../PromoCard/PromoCard";
import { useScrollTop } from "@/shared/lib";
import { TryNowButton } from "../TryNowButton/TryNowButton";

interface AboutProps {
  className?: string;
}

export const About: FC<AboutProps> = ({ className }) => {
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
        Why <span className={styles.accent_text}>You</span> need{" "}
        <span className={styles.accent_text}>E-Sport?</span>
      </SubTitle>
      <div
        className={"container flex flex-wrap gap-3 text-center justify-center"}
      >
        <PromoCard>
          Do You want to find a Sport for you in your place?
        </PromoCard>
        <PromoCard>
          Are <span className={styles.accent_text}>You</span> a trainer?
        </PromoCard>
        <PromoCard>
          Are <span className={styles.accent_text}>You</span> a gym
          administrator?
        </PromoCard>
        <PromoCard>
          Do <span className={styles.accent_text}>You</span> want to create a
          really big sport organisation?
        </PromoCard>
        <PromoCard>
          Do <span className={styles.accent_text}>You</span> want to see sport
          streams
        </PromoCard>
        <PromoCard>
          Do <span className={styles.accent_text}>You</span> want to participate
          in tournaments
        </PromoCard>
      </div>
      <Title center size={"extra-large"} className={"mt-20"}>
        You need <span className={styles.accent_text}>E-Sport!</span>
      </Title>
      <div className={"flex flex-col justify-center mt-4 gap-5 mx-[40%]"}>
        <TryNowButton />
      </div>
    </div>
  );
};
