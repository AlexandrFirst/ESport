import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { getMainLayout } from "@/widgets/MainLayout";
import { CreateCompetitionSteps } from "@/features/(competition)/CreateCompetitionSteps";

type Props = {};

const CreateCompetitionPage: AppNextPage<Props> = () => {
  // return <CreateCompetitionCard />;
  return <CreateCompetitionSteps />;
};

CreateCompetitionPage.getLayout = getMainLayout({
  headProps: { title: `Create Competition | E-Sport` },
  withFooter: true,
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
