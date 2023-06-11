import React, { FC } from "react";
import styles from "./Footer.module.css";

import { RegularText } from "@/shared/ui";

interface FooterProps {
  className?: string;
}

export const MainPageFooter: FC<FooterProps> = ({ className }) => {
  return (
    <footer className={styles.wrapper}>
      <RegularText>
        © Copyright 2023 E-SPORT COMPANY. Powered with ♥ by nure students
      </RegularText>
    </footer>
  );
};
