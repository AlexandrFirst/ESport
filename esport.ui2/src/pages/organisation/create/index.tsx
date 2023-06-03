import { useForm } from "react-hook-form";

import { AppNextPage, PageProps } from "@/shared/types";

import {
  CreateEditOrganisationForm,
  ICreateOrganisation,
} from "@/entities/organisation";

import { getMainLayout } from "@/widgets/MainLayout";
import { Card, Title } from "@/shared/ui";

type CreateOrganisationProps = PageProps & {};

const CreateOrganisation: AppNextPage<CreateOrganisationProps> = () => {
  const methods = useForm<ICreateOrganisation>();
  return (
    <Card>
      <Title center>Create organisation</Title>
      <CreateEditOrganisationForm methods={methods} />
    </Card>
  );
};

CreateOrganisation.getLayout = getMainLayout({
  headProps: { title: "CreateOrganisation | E-Sport" },
});

export default CreateOrganisation;
