import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CreateCompetitionFormCard } from "@page-widgets/page-create-competition";
import { getAppServerSideProps } from "@app/store/lib/getAppServerSideProps";

const CreateCompetitionPage: NextPage = () => {
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
