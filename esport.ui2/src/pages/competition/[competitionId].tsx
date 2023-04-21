import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type CompetitionPageProps = {};

const CompetitionPage: NextPage<CompetitionPageProps> = () => {
  return <div>CompetitionIdPage</div>;
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
