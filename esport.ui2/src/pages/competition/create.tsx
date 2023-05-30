import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { CreateCompetitionCard } from "@/entities/competition";

import { getMainLayout } from "@/widgets/MainLayout";

type Props = {};

const CreateCompetitionPage: AppNextPage<Props> = () => {
  return <CreateCompetitionCard />;
};

CreateCompetitionPage.getLayout = getMainLayout({
  headProps: { title: `Create Competition | E-Sport` },
});

export default CreateCompetitionPage;

export const getServerSideProps = getAppServerSideProps(
  async (ctx) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common"]
    );
    return {
      props: {
        ...localization,
      },
    };
  },
  { auth: true }
);
