import React from "react";
import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { ICompetition } from "@entities/competition";
import { getAppServerSideProps } from "@app/store";

import { CompetitionsGrid } from "@page-widgets/page-all-competitions";

type PageProps = {
  competitions: ICompetition[];
};

const CompetitionPage: NextPage<PageProps> = ({ competitions = [] }) => {
  return (
    <MainLayout>
      <CompetitionsGrid competitions={competitions} />
    </MainLayout>
  );
};

export default CompetitionPage;

export const getServerSideProps = getAppServerSideProps<PageProps>(async () => {
  const data = await new Promise<{ competitions: ICompetition[] }>((resolve) =>
    resolve({ competitions: [] })
  );

  return {
    props: data,
  };
});
