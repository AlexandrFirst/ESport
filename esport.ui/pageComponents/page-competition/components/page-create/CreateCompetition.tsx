import React from "react";
import { MainLayout } from "@features/MainLayout/MainLayout";
import { SportPageTitle } from "@components/SportPageTitle/SportPageTitle";
import { useForm } from "react-hook-form";
import { CreateCompetitionForm } from "@pageComponents/page-competition/components/page-create/CreateCompetitionForm/CreateCompetitionForm";

export const CreateCompetition: React.FC = () => {
  //TODO: add type
  const methods = useForm<any>();

  return (
    <MainLayout>
      <SportPageTitle textCenter>Create competition</SportPageTitle>
      <CreateCompetitionForm methods={methods} />
    </MainLayout>
  );
};
