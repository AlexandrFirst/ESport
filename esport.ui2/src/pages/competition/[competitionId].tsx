import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { MainLayout } from "@/widgets/MainLayout";

type CompetitionPageProps = {};

const CompetitionPage: NextPage<CompetitionPageProps> = () => {
  return <MainLayout>CompetitionIdPage</MainLayout>;
};

export default CompetitionPage;

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
