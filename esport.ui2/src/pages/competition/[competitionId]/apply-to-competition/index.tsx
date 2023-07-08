import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PageProps, AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { getMainLayout } from "@/widgets/MainLayout";
import { useAuth, useCurrentUserProfileInfo } from "@/entities/user";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  competitionQueryKeys,
  getCompetitionWithOrganisation,
  getCompetitorRecords,
  useCompetitionWithOrganisation,
  useGetCompetitorRecords,
} from "@/entities/competition";

import { ApplyToCompetition } from "@/_pages/(competition)/ApplyToCompetition";

type ApplyToCompetitionProps = PageProps & {};

const ApplyToCompetitionPage: AppNextPage<ApplyToCompetitionProps> = () => {
  return <ApplyToCompetition />;
};

ApplyToCompetitionPage.getLayout = getMainLayout({
  headProps: { title: "ApplyToCompetition | E-Sport" },
});

export default ApplyToCompetitionPage;

export const getServerSideProps = getAppServerSideProps(async (ctx, store) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );

  const competitionId = Number(ctx.query.competitionId);
  const { user } = store.getState();

  const queryClient = new QueryClient();
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: competitionQueryKeys.byIdWithOrganisation(competitionId),
      queryFn: () => getCompetitionWithOrganisation({ competitionId }),
    }),
    queryClient.prefetchQuery({
      queryKey: competitionQueryKeys.getCompetitorRecords({
        userId: user.data?.id ?? 0,
        competitionId,
      }),
      queryFn: () =>
        getCompetitorRecords({
          userId: user.data?.id ?? 0,
          competitionId,
        }),
    }),
  ]);

  return {
    props: {
      ...localization,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
