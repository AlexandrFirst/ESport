import React, { memo } from "react";
import styles from "./Logo.module.css";

import { Title } from "..";
import { routes } from "../../config/routeConfig/routeConfig";

import Link from "next/link";
import { ImageProps } from "next/image";
import cn from "classnames";

import { LogoSvg } from "./logoSvg";

interface SportLogoProps extends Partial<ImageProps> {
  showText?: boolean;
  width?: number;
  height?: number;
}

const Logo: React.FC<SportLogoProps> = ({ showText = false, ...props }) => {
  return (
    <div {...props} className={styles.wrapper}>
      <div
        // drag
        // dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className={styles.logo}
      >
        {LogoSvg}
      </div>
      <Title
        className={cn(styles.title, {
          [styles.not_visible]: !showText,
          [styles.show_text]: showText,
        })}
      >
        <Link href={routes.Home()}>E-SPORT</Link>
      </Title>
    </div>
  );
};

export default memo(Logo);
