import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { CreateCompetitionCard } from "@/entities/competition";

import { MainLayout } from "@/widgets/MainLayout";

type Props = {};

const CreateCompetitionPage: NextPage<Props> = () => {
  return (
    <MainLayout>
      <CreateCompetitionCard />
    </MainLayout>
  );
};

export default CreateCompetitionPage;

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
