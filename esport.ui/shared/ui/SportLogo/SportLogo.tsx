import React from "react";
import styles from "./sportLogo.module.css";

import { routes } from "routes";

import Link from "next/link";
import { ImageProps } from "next/image";
import { motion } from "framer-motion";
import cn from "classnames";

import { SportTitle } from "../SportTitle/SportTitle";
import { Logo } from "./logo";

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
    <div {...props} className={styles.wrapper}>
      <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className={styles.logo}
      >
        {Logo}
      </motion.div>
      <SportTitle
        className={cn(styles.title, {
          [styles.not_visible]: !showText,
          [styles.show_text]: showText,
        })}
      >
        <Link href={routes.Main}>E-SPORT</Link>
      </SportTitle>
    </div>
  );
};
