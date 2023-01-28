import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CreateCompetitionFormCard } from "@page-widgets/page-create-competition";

const CreateCompetitionPage: NextPage = () => {
  return (
    <MainLayout>
      <CreateCompetitionFormCard />
    </MainLayout>
  );
};

export default CreateCompetitionPage;
