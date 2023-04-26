import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import {
  competitionApi,
  CompetitionGrid,
  ICompetitonWithCategories,
} from "@/entities/competition";

import { MainLayout } from "@/widgets/MainLayout";
import { Title } from "@/shared/ui";

type CompetitionPageProps = {
  competition?: ICompetitonWithCategories;
};

const CompetitionPage: NextPage<CompetitionPageProps> = ({ competition }) => {
  const tmp = competition?.categories[0];
  return (
    <MainLayout>
      <Title>Categories</Title>
      {tmp?.title}
      <CompetitionGrid category={tmp} />
    </MainLayout>
  );
};

export default CompetitionPage;

export const getServerSideProps: GetServerSideProps<
  CompetitionPageProps
> = async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const competitionId = ctx.params?.competitionId as string;

  const { data } = await competitionApi.getCompetition(competitionId);
  return {
    props: {
      ...localization,
      ...data,
    },
  };
};
