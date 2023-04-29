import React from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage } from "@/shared/types";

import { CreateCompetitionCard } from "@/entities/competition";

import { MainLayout } from "@/widgets/MainLayout";

type Props = {};

const CreateCompetitionPage: AppNextPage<Props> = () => {
  return <CreateCompetitionCard />;
};

CreateCompetitionPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
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
