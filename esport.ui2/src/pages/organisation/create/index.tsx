import { AppNextPage, PageProps } from "@/shared/types";

import { CreateOrganisationForm } from "@/entities/organisation";

import { getMainLayout } from "@/widgets/MainLayout";
import { Card, Title } from "@/shared/ui";

type CreateOrganisationProps = PageProps & {};

const CreateOrganisation: AppNextPage<CreateOrganisationProps> = () => {
  return (
    <Card>
      <Title center>Create organisation</Title>
      <CreateOrganisationForm />
    </Card>
  );
};

CreateOrganisation.getLayout = getMainLayout({
  headProps: { title: "CreateOrganisation | E-Sport" },
});

export default CreateOrganisation;
