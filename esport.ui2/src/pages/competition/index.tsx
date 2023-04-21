import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainLayout } from "@/widgets/MainLayout";

type CompetitionPageProps = {};

const CompetitionPage: NextPage<CompetitionPageProps> = () => {
  return <MainLayout>CompetitionPage</MainLayout>;
};

export default CompetitionPage;

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
