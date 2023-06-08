import { AppNextPage, PageProps } from "@/shared/types";

import { CreateExerciseForm } from "@/features/CreateExercise";

import { getMainLayout } from "@/widgets/MainLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getAppServerSideProps } from "@/shared/lib";
import { UserRole } from "@/shared/constants";

type CreateExerciseProps = PageProps & {};

const CreateExercise: AppNextPage<CreateExerciseProps> = () => {
  return <CreateExerciseForm />;
};

CreateExercise.getLayout = getMainLayout({
  headProps: { title: "CreateExercise | E-Sport" },
  withFooter: true,
});

export default CreateExercise;

export const getServerSideProps = getAppServerSideProps(
  async (ctx) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common"]
    );
    return {
      props: {
        ...localization,
      },
    };
  },
  { roles: [UserRole.Trainer] }
);
