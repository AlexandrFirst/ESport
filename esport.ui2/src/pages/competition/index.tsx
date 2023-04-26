import { GetServerSideProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";

import { competitionApi, ICompetiton } from "@/entities/competition";

import { MainLayout } from "@/widgets/MainLayout";

type CompetitionPageProps = {
  competitions?: ICompetiton[];
};

const CompetitionPage: NextPage<CompetitionPageProps> = ({ competitions }) => {
  return (
    <MainLayout>
      <Title>TEMPORARY PAGE</Title>
      {competitions?.map((c) => (
        <div key={c._id}>
          <UILink href={routes.Competition.CompetitionById([c._id])}>
            {c.title}
          </UILink>
        </div>
      ))}
    </MainLayout>
  );
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
  const { data } = await competitionApi.getAllCompetitions();
  return {
    props: {
      ...localization,
      competitions: data,
    },
  };
};
