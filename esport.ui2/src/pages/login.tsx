import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { AnonLayout } from "@/widgets/AnonLayout";
import { LoginForm } from "@/features/LoginForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {
  httpsAgent: any;
};

export const Context = React.createContext<{ httpsAgent: any }>({
  httpsAgent: null,
});

const LoginPage: NextPage<Props> = ({ httpsAgent }) => {
  return (
    <AnonLayout
      title="Welcome to E-Sport 👋🏻"
      subtitle="Please sign-in to your account and start the adventure"
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
    ["common"]
  );
  return {
    props: {
      ...localization,
    },
  };
};
