import { GetServerSideProps, NextPage } from "next";
import React from "react";

import { AnonLayout } from "@/widgets/AnonLayout";
import { RegisterForm } from "@/features/RegisterForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {};

const RegisterPage: NextPage<Props> = () => {
  return (
    <AnonLayout
      title="Adventure starts here 🚀"
      subtitle="Please sign-in to your account and start the adventure"
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
    ["common"]
  );
  return {
    props: {
      ...localization,
    },
  };
};
