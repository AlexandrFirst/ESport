import React from "react";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage } from "@/shared/types";

import { LoginForm } from "@/features/LoginForm";

import { AnonLayout } from "@/widgets/AnonLayout";
import { useTranslation } from "next-i18next";

type Props = {
  httpsAgent: any;
};

const LoginPage: AppNextPage<Props> = () => {
  const { t } = useTranslation("login");

  return (
    <AnonLayout
      headProps={{ title: "E-Sport | Login" }}
      title={`${t("title")} 👋🏻`}
      subtitle={t("subtitle") ?? ""}
    >
      <LoginForm />
    </AnonLayout>
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const localization = await serverSideTranslations(
    locale ?? defaultLocale ?? "en",
    ["common", "login"]
  );
  return {
    props: {
      ...localization,
    },
  };
};
