import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CreateCompetitionFormCard } from "@page-widgets/page-create-competition/components/CreateCompetitionFormCard/CreateCompetitionFormCard";

const CreateCompetitionPage: NextPage = () => {
  return (
    <MainLayout>
      <CreateCompetitionFormCard />
    </MainLayout>
  );
};

export default CreateCompetitionPage;
