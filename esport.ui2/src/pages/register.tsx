import React from "react";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { AppNextPage } from "@/shared/types";

import { RegisterForm } from "../features/(auth)/RegisterForm";

import { AnonLayout } from "@/widgets/AnonLayout";

type Props = {};

const RegisterPage: AppNextPage<Props> = () => {
  const { t } = useTranslation("register");

  return (
    <AnonLayout
      headProps={{ title: "E-Sport | Register" }}
      title={`${t("title")} 🚀`}
      subtitle={t("subtitle") ?? ""}
    >
      <RegisterForm />
    </AnonLayout>
  );
};

export default RegisterPage;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale,
}) => {
  const localization = await serverSideTranslations(
    locale ?? defaultLocale ?? "en",
    ["common", "register"]
  );
  return {
    props: {
      ...localization,
    },
  };
};
