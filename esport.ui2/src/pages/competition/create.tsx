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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  return {
    props: {
      ...localization,
    },
  };
};
