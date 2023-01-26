import React from "react";
import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CreateCompetitionForm } from "@page-widgets/page-create-competition";

const CompetitionPage: NextPage = () => {
  return (
    <MainLayout>
      <CreateCompetitionForm />
    </MainLayout>
  );
};

export default CompetitionPage;
