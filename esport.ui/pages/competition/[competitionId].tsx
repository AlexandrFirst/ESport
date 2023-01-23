import { GetServerSideProps, NextPage } from "next";
import styles from "@page-widgets/page-create-categories/pageCreateCategories.module.scss";

import { MainLayout } from "@layouts/MainLayout";
import { competitionApi, ICompetition } from "@entities/competition";

import {
  CategoriesWithSearch,
  CreateCategoriesTitle,
} from "@page-widgets/page-create-categories";

type PageProps = {
  competition: ICompetition;
};

type PageParams = {
  competitionId: string;
};

const CompetitionPage: NextPage<PageProps> = ({ competition }) => {
  return (
    <MainLayout className={styles.wrapper}>
      <CreateCategoriesTitle title={competition.title} />
      <CategoriesWithSearch categories={competition.categories} />
    </MainLayout>
  );
};

export default CompetitionPage;

export const getServerSideProps: GetServerSideProps<
  PageProps,
  PageParams
> = async ({ params, query }) => {
  const { competition } = await competitionApi.getById({
    id: params?.competitionId ?? "",
    search: query.q as string,
  });

  return {
    props: {
      competition,
    },
  };
};
