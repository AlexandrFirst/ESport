import { FC } from "react";
import styles from "./Translate.module.css";

import { IconButton, Menu, DropdownDirection } from "@/shared/ui";

import { LanguageIcon } from "@heroicons/react/24/solid";
import cn from "classnames";

interface TranslateProps {
  className?: string;
  direction?: DropdownDirection;
}

const languages = ["English", "Ukrainian", "French"];

export const Translate: FC<TranslateProps> = ({
  className,
  direction = "bottom right",
}) => {
  return (
    <>
      <Menu
        menuButton={
          <IconButton
            as={"div"}
            Svg={LanguageIcon}
            className={cn(styles.wrapper, className)}
            iconSize={"l"}
          />
        }
        list={languages.map((language) => ({
          children: language,
          key: language,
          selected: language === "English",
        }))}
        direction={direction}
      />
    </>
  );
};
