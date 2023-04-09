import React, { ReactNode } from "react";
import styles from "./AboutInfo.module.scss";

import { SportBoldText, SportSemiBoldText } from "@shared/ui/SportText";

interface AboutInfoItemProps {
  boldText: string;
  semiBoldText?: string;
  icon: ReactNode;
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
      {icon}
      <SportBoldText className={styles.item}>{boldText}:</SportBoldText>
      <SportSemiBoldText>
        {link ? (
          <a href={link} target={"_blank"} rel="noreferrer">
            {semiBoldText}
          </a>
        ) : (
          semiBoldText
        )}
      </SportSemiBoldText>
    </li>
  );
};
