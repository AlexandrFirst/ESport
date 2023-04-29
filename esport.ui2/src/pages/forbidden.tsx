import { AppNextPage } from "@/shared/types";
import { MainLayout } from "@/widgets/MainLayout";

type ForbiddenPageProps = {};

const ForbiddenPage: AppNextPage<ForbiddenPageProps> = () => {
  return <>ForbiddenPage</>;
};

ForbiddenPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default ForbiddenPage;
