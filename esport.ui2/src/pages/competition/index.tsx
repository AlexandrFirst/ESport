import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";
import { AppNextPage } from "@/shared/types";

import { competitionApi, ICompetiton } from "@/entities/competition";

import { MainLayout } from "@/widgets/MainLayout";

type CompetitionPageProps = {
  competitions?: ICompetiton[];
};

const CompetitionPage: AppNextPage<CompetitionPageProps> = ({
  competitions,
}) => {
  return (
    <>
      <Title>TEMPORARY PAGE</Title>
      {competitions?.map((c) => (
        <div key={c._id}>
          <UILink href={routes.Competition.CompetitionById([c._id])}>
            {c.title}
          </UILink>
        </div>
      ))}
    </>
  );
};

CompetitionPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
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
