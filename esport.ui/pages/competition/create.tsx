import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CreateCompetitionFormCard } from "@page-widgets/page-create-competition";
import { getAppServerSideProps } from "@app/store";

interface CreateProps {}

const CreateCompetitionPage: NextPage<CreateProps> = () => {
  return (
    <MainLayout>
      <CreateCompetitionFormCard />
    </MainLayout>
  );
};

export default CreateCompetitionPage;

export const getServerSideProps = getAppServerSideProps(async () => {
  return {
    props: {},
  };
});
