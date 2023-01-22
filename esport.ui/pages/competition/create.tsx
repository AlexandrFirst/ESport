import React from "react";
import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CreateCompetitionForm } from "@page-widgets/page-create-competition";
import { CreateCompetitionTitle } from "@page-widgets/page-create-competition/components/CreateCompetitionTitle/CreateCompetitionTitle";

const CompetitionPage: NextPage = () => {
  return (
    <MainLayout>
      <CreateCompetitionTitle />
      <CreateCompetitionForm />
    </MainLayout>
  );
};

export default CompetitionPage;
