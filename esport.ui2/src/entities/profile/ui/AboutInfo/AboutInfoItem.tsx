import React from "react";
import styles from "./AboutInfo.module.css";

import { BoldText, Icon, IconSvg, SemiBoldText } from "@/shared/ui";

interface AboutInfoItemProps {
  boldText: string;
  semiBoldText?: string;
  icon: IconSvg;
  link?: string;
}

export const AboutInfoItem: React.FC<AboutInfoItemProps> = ({
  icon,
  boldText,
  semiBoldText,
  link,
}) => {
  if (!semiBoldText) return null;

  return (
    <li className={styles.list_item}>
      <Icon Svg={icon} className={styles.item} />
      <BoldText className={styles.item}>{boldText}:</BoldText>
      <SemiBoldText>
        {link ? (
          <a href={link} target={"_blank"} rel="noreferrer">
            {semiBoldText}
          </a>
        ) : (
          semiBoldText
        )}
      </SemiBoldText>
    </li>
  );
};
