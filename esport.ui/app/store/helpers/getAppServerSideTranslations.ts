import { UserConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { TranslationsCtx } from "@app/store";
import { AppLanguage } from "@shared/config";

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
