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
  const router = useRouter();

  const list = useMemo(
    () =>
      Object.entries({
        [Languages.English]: "English",
        [Languages.Ukrainian]: "Ukrainian",
      }).map(([locale, language]) => ({
        key: locale,
        selected: locale === router.locale,
        children: (
          <UILink href={""} locale={locale} className={styles.link}>
            {language}
          </UILink>
        ),
      })),
    [router.locale]
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
