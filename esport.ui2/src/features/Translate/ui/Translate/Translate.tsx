import { FC, useMemo, useState } from "react";
import styles from "./Translate.module.css";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { LanguageIcon } from "@heroicons/react/24/solid";

import {
  BrowserView,
  DownDrawer,
  DropdownDirection,
  IconButton,
  Menu,
  MenuList,
  MobileView,
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

  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const handleCloseDrawer = () => setIsDrawerOpened(false);
  const handleOpenDrawer = () => setIsDrawerOpened(true);

  const list: MenuList = useMemo(
    () =>
      Object.entries({
        [Languages.English]: t("en"),
        [Languages.Ukrainian]: t("uk"),
      }).map(([locale, language]) => ({
        key: locale,
        selected: locale === router.locale,
        children: (
          <UILink href={""} locale={locale} className={styles.link}>
            {language}
          </UILink>
        ),
      })),
    [router.locale, t]
  );

  const languageIcon = (
    <IconButton
      onClick={handleOpenDrawer}
      as={"div"}
      Svg={LanguageIcon}
      className={cn(styles.wrapper, className)}
      iconSize={"l"}
    />
  );

  return (
    <>
      <BrowserView>
        <Menu menuButton={languageIcon} list={list} direction={direction} />
      </BrowserView>
      <MobileView>
        {languageIcon}
        <DownDrawer isOpen={isDrawerOpened} onClose={handleCloseDrawer}>
          {list.map(({ key, children }) => (
            <div key={key}>{children}</div>
          ))}
        </DownDrawer>
      </MobileView>
    </>
  );
};
