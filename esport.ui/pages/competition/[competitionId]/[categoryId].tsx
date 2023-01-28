import { GetServerSideProps, NextPage } from "next";
import styles from "@page-widgets/page-create-categories/pageCreateCategories.module.css";

import { MainLayout } from "@layouts/MainLayout";
import {
  CategoryTitle,
  competitionApi,
  ICategory,
} from "@entities/competition";
import { CategoryFightList } from "@page-widgets/page-category/components/CategoryFightList/CategoryFightList";

interface PageProps {
  category: ICategory | null;
  error?: boolean;
}

type PageParams = {
  categoryId: string;
};

const CategoryPage: NextPage<PageProps> = ({ category }) => {
  return (
    <MainLayout className={styles.wrapper}>
      <CategoryTitle>{category?.title}</CategoryTitle>
      <CategoryFightList category={category} />
    </MainLayout>
  );
};

export default CategoryPage;

export const getServerSideProps: GetServerSideProps<
  PageProps,
  PageParams
> = async ({ params }) => {
  try {
    const { category } = await competitionApi.getCategoryById(
      params?.categoryId ?? ""
    );
    return {
      props: { category },
    };
  } catch (e) {
    return {
      props: {
        category: null,
      },
    };
  }
};
