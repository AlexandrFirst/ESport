import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title } from "@/shared/ui";
import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { ICompetiton } from "@/entities/competition";

import { getMainLayout } from "@/widgets/MainLayout";
import { CompetitionsTable } from "@/widgets/CompetitionsTable";

type CompetitionPageProps = {
  competitions?: ICompetiton[];
};

const CompetitionPage: AppNextPage<CompetitionPageProps> = ({
  competitions,
}) => {
  return (
    <>
      <Title>Choose competiton</Title>
      <CompetitionsTable competitions={competitions} className={"mt-20"} />
      {/*{competitions?.map((c) => (*/}
      {/*  <div key={c._id}>*/}
      {/*    <UILink href={routes.Competition.CompetitionById([c._id])}>*/}
      {/*      {c.title}*/}
      {/*    </UILink>*/}
      {/*  </div>*/}
      {/*))}*/}
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

  const data: ICompetiton[] = [
    {
      _id: "64492f90e4f612d8e099d517",
      title: "Міжнародний турнір у Києві",
      dateStart: new Date("06-28-2023").toLocaleDateString(),
      organizationId: 1,
      categories: ["1", "2", "3"],
      dateEnd: new Date("06-28-2023").toLocaleDateString(),
    },
    {
      _id: "64492f90e4f612d8e099d518",
      title: "Обласний турнір у Чернівцях",
      dateStart: new Date("01-12-2022").toLocaleDateString(),
      organizationId: 1,
      categories: ["1", "2", "3"],
      dateEnd: new Date("01-14-2022").toLocaleDateString(),
    },
  ];

  return {
    props: {
      ...localization,
      competitions: data,
    },
  };
});
