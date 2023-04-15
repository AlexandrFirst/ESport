import { FC, useMemo } from "react";
import styles from "./Translate.module.css";

import { DropdownDirection, IconButton, Menu, UILink } from "@/shared/ui";

import { LanguageIcon } from "@heroicons/react/24/solid";
import cn from "classnames";
import { Languages } from "@/shared/constants";
import { useRouter } from "next/router";

interface TranslateProps {
  className?: string;
  direction?: DropdownDirection;
}

export const Translate: FC<TranslateProps> = ({
  className,
  direction = "bottom right",
}) => {
  const languages: Record<Languages, string> = {
    [Languages.English]: "English",
    [Languages.Ukrainian]: "Ukrainian",
  };

  const router = useRouter();

  const list = useMemo(
    () =>
      Object.entries(languages).map(([locale, language]) => ({
        children: (
          <UILink href={""} locale={locale} className={styles.link}>
            {language}
          </UILink>
        ),
        key: language,
        selected: locale === router.locale,
      })),
    [languages, router.locale]
  );

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
        list={list}
        direction={direction}
      />
    </>
  );
};
