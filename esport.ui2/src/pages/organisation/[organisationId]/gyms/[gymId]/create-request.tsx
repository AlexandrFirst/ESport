import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";

type CreateRequestProps = PageProps & {};

const CreateRequest: AppNextPage<CreateRequestProps> = () => {
  return <div>CreateRequest</div>;
};

CreateRequest.getLayout = getMainLayout({
  headProps: { title: "CreateRequest | E-Sport" },
});

export default CreateRequest;
