import React from "react";
import { GetServerSideProps, NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CompetitionsGrid, ICompetition } from "@entities/competition";

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

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      competitions: [],
    },
  };
};
