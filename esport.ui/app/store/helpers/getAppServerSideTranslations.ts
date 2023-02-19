import { UserConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppLanguage } from "@shared/enums/app-language";
import { TranslationsCtx } from "@app/store";

export const getAppServerSideTranslations = async (
  { defaultLocale, locale }: TranslationsCtx,
  namespacesRequired?: string[] | undefined,
  configOverride?: UserConfig | null,
  extraLocales?: string[] | false
) =>
  serverSideTranslations(
    locale ?? defaultLocale ?? AppLanguage.Eng,
    namespacesRequired,
    configOverride,
    extraLocales
  );
