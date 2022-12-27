import React from "react";
import styles from "./sportLogo.module.css";

import { ImageProps } from "next/image";

import { SportTitle } from "@components/SportTitle/SportTitle";
import { Logo } from "./logo";
import cn from "classnames";

interface SportLogoProps extends Partial<ImageProps> {
  showText?: boolean;
  width?: number;
  height?: number;
}

export const SportLogo: React.FC<SportLogoProps> = ({
  showText = false,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      {/* <Image {...props} src={Logo} alt='E-sport logo' /> */}
      {/* <img src={Logo} alt='' /> */}
      <div className={styles.logo}>{Logo}</div>
      <SportTitle
        className={cn(styles.title, {
          [styles.not_visible]: !showText,
          [styles.show_text]: showText,
        })}
      >
        E-SPORT
      </SportTitle>
    </div>
  );
};
