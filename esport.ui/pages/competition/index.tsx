import React from "react";
import { GetServerSideProps, NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { competitionApi, ICompetition } from "@entities/competition";

import { CompetitionsGrid } from "@page-widgets/page-all-competitions";

type PageProps = {
  competitions: ICompetition[];
};

const CompetitionPage: NextPage<PageProps> = ({ competitions }) => {
  return (
    <MainLayout>
      <CompetitionsGrid competitions={competitions} />
    </MainLayout>
  );
};

export default CompetitionPage;

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  query,
}) => {
  const competitions = await competitionApi.getAllCompetitions({
    search: query.q as string,
  });

  return {
    props: {
      competitions: competitions ?? [],
    },
  };
};
