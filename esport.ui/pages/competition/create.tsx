import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import {
  CreateCompetitionForm,
  CreateCompetitionTitle,
} from "@page-widgets/page-create-competition";

const CreateCompetitionPage: NextPage = () => {
  return (
    <MainLayout>
      <CreateCompetitionTitle />
      <CreateCompetitionForm />
    </MainLayout>
  );
};

export default CreateCompetitionPage;
