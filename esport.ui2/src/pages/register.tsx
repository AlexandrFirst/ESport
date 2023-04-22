import { RegisterForm } from "@/features/RegisterForm";

import { AnonLayout } from "@/widgets/AnonLayout";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

type Props = {};

const RegisterPage: NextPage<Props> = () => {
  return (
    <AnonLayout
      headProps={{ title: "E-Sport | Register" }}
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
