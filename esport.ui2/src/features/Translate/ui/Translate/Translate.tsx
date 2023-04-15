import { FC, useMemo } from "react";
import styles from "./Translate.module.css";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { LanguageIcon } from "@heroicons/react/24/solid";

import {
  DropdownDirection,
  IconButton,
  Menu,
  MenuItem,
  UILink,
} from "@/shared/ui";

import { Languages } from "@/shared/constants";

interface TranslateProps {
  className?: string;
  direction?: DropdownDirection;
}

export const Translate: FC<TranslateProps> = ({
  className,
  direction = "bottom right",
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const list: MenuItem[] = useMemo(
    () =>
      Object.entries({
        [Languages.English]: t("en"),
        [Languages.Ukrainian]: t("uk"),
      }).map(([locale, language]) => ({
        key: locale,
        selected: locale === router.locale,
        children: (close) => (
          <UILink
            href={""}
            locale={locale}
            className={styles.link}
            onClick={close}
          >
            {language}
          </UILink>
        ),
      })),
    [router.locale, t]
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
