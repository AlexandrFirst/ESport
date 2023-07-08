import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";
import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { ICompetitonOld } from "@/entities/competition";

import { getMainLayout } from "@/widgets/MainLayout";

type CompetitionPageProps = {
  competitions?: ICompetitonOld[];
};

const CompetitionPage: AppNextPage<CompetitionPageProps> = ({
  competitions,
}) => {
  return (
    <>
      <Title>TEMPORARY PAGE</Title>
      {competitions?.map((c) => (
        <div key={c.id}>
          <UILink href={routes.Competition.CompetitionById([c.id])}>
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
  // const { data } = await CompetitionApi(ctx).getAllCompetitions();

  const data: ICompetitonOld[] = [
    {
      id: 1,
      title: "Міжнародний турнір у Києві",
      dateStart: "",
      categories: ["1", "2", "3"],
      registrationCloseDate: new Date().toLocaleDateString(),
      dateEnd: new Date().toLocaleDateString(),
      isRegistrationOpen: true,
    },
    {
      id: 2,
      title: "Обласний турнір у Чернівцях",
      dateStart: "",
      categories: ["1", "2", "3"],
      registrationCloseDate: new Date().toLocaleDateString(),
      dateEnd: new Date().toLocaleDateString(),
      isRegistrationOpen: true,
    },
  ];

  return {
    props: {
      ...localization,
      competitions: data,
    },
  };
});
