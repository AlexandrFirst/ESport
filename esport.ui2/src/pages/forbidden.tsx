import { AppNextPage } from "@/shared/types";
import { MainLayout } from "@/widgets/MainLayout";
import { Title } from "@/shared/ui";

type ForbiddenPageProps = {};

const ForbiddenPage: AppNextPage<ForbiddenPageProps> = () => {
  return (
    <>
      <Title className={"text-[52px] text-center"}>
        You are not allowed to this page
      </Title>
    </>
  );
};

ForbiddenPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

export default ForbiddenPage;
