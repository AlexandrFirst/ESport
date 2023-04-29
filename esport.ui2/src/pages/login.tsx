import React from "react";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage } from "@/shared/types";

import { LoginForm } from "@/features/LoginForm";

import { AnonLayout } from "@/widgets/AnonLayout";

type Props = {
  httpsAgent: any;
};

const LoginPage: AppNextPage<Props> = () => {
  return <LoginForm />;
};

LoginPage.getLayout = (page) => {
  return (
    <AnonLayout
      headProps={{ title: "E-Sport | Login" }}
      title="Welcome to E-Sport 👋🏻"
      subtitle="Please sign-in to your account and start the adventure"
    >
      {page}
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
    ["common"]
  );
  return {
    props: {
      ...localization,
    },
  };
};
