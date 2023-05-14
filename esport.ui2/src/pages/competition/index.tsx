import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";
import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { CompetitionApi, ICompetiton } from "@/entities/competition";

import { getMainLayout } from "@/widgets/MainLayout";

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

CompetitionPage.getLayout = getMainLayout({
  headProps: { title: "E-Sport | Competitions" },
});

export default CompetitionPage;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const { data } = await CompetitionApi(ctx).getAllCompetitions();
  return {
    props: {
      ...localization,
      competitions: data,
    },
  };
});
