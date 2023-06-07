import { AppNextPage, PageProps } from "@/shared/types";

import { CreateExerciseForm } from "@/features/CreateExercise";

import { getMainLayout } from "@/widgets/MainLayout";

type CreateExerciseProps = PageProps & {};

const CreateExercise: AppNextPage<CreateExerciseProps> = () => {
  return <CreateExerciseForm />;
};

CreateExercise.getLayout = getMainLayout({
  headProps: { title: "CreateExercise | E-Sport" },
  withFooter: true,
});

export default CreateExercise;
