import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { UserRole } from "@/shared/constants";

import { getTrainerExercises, trainerApiKeys } from "@/entities/trainer";

import { getMainLayout } from "@/widgets/MainLayout";
import { TrainerExerciseList } from "@/widgets/TrainerExercises";

type ExcercisesProps = PageProps & {};

const Excercises: AppNextPage<ExcercisesProps> = () => {
  return <TrainerExerciseList />;
};

Excercises.getLayout = getMainLayout({
  headProps: { title: "Excercises | E-Sport" },
});

export default Excercises;

export const getServerSideProps = getAppServerSideProps(
  async (ctx) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common"]
    );
    const queryClient = new QueryClient();

    const request = {
      bodyParts: [],
      isMine: false,
      name: "",
      page: 1,
      pageSize: 100,
      sports: [],
    };

    await queryClient.prefetchQuery({
      queryKey: trainerApiKeys.exerciseListing(request),
      queryFn: async () => getTrainerExercises(request, ctx),
    });

    return {
      props: {
        ...localization,
        dehydratedState: dehydrate(queryClient),
      },
    };
  },
  { roles: [UserRole.Trainer] }
);
