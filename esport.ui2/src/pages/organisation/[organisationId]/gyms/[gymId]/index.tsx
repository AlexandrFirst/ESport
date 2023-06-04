import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { AppNextPage, PageProps } from "@/shared/types";
import { Card, ErrorText } from "@/shared/ui";
import { getAppServerSideProps } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";

import {
  CollapsableGymReadInfo,
  getGymTimetable,
  getGymTrainerRequests,
  GymApi,
  gymApiKeys,
  IGymReadInfo,
} from "@/entities/gym";
import {
  getPendingTrainers,
  getProfileInfo,
  profileApiKeys,
} from "@/entities/profile";

import { getMainLayout } from "@/widgets/MainLayout";
import { GymInfoTabs } from "@/widgets/GymInfoTabs";

type GymProps = PageProps & {
  gym: IGymReadInfo;
};

const Gym: AppNextPage<GymProps> = ({ error, gym }) => {
  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <>
      <Card>
        <CollapsableGymReadInfo gym={gym} />
      </Card>
      <GymInfoTabs gym={gym} />
    </>
  );
};

Gym.getLayout = getMainLayout({
  headProps: { title: "Gym | E-Sport" },
});

export default Gym;

export const getServerSideProps = getAppServerSideProps(async (ctx, store) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const { gymId, organisationId } = ctx.query;

  const queryClient = new QueryClient();
  const { user } = store.getState();
  const userId = user?.data?.id ?? 0;

  const [{ data: gymsResponse }] = await Promise.all([
    GymApi(ctx).gymListing({
      organisationIds: [],
      gymIds: [Number(gymId ?? 0)],
      page: 1,
      pageSize: 1,
    }),
    queryClient.prefetchQuery({
      queryKey: gymApiKeys.gymTimetable(Number(gymId ?? 0), {
        dayOfTheWeeks: [DayOfTheWeek.ALL],
      }),
      queryFn: () =>
        getGymTimetable(
          Number(gymId ?? 0),
          {
            dayOfTheWeeks: [DayOfTheWeek.ALL],
          },
          ctx
        ),
    }),
    queryClient.prefetchQuery({
      queryKey: profileApiKeys.getProfileById(userId),
      queryFn: async () => getProfileInfo(userId, ctx),
    }),
    queryClient.prefetchQuery({
      queryKey: gymApiKeys.getTrainerRequestsRequest({
        page: 1,
        pageSize: 1000,
        gymId: Number(gymId ?? 0),
        organisationId: Number(organisationId ?? 0),
      }),
      queryFn: async () =>
        getGymTrainerRequests(
          {
            page: 1,
            pageSize: 100,
            gymId: Number(gymId ?? 0),
            organisationId: Number(organisationId ?? 0),
          },
          ctx
        ),
    }),
    queryClient.prefetchQuery({
      queryKey: profileApiKeys.getPendingTrainers(Number(gymId), {
        pageSize: 100,
        currentPage: 1,
      }),
      queryFn: async () =>
        getPendingTrainers(
          Number(gymId),
          {
            currentPage: 1,
            pageSize: 100,
          },
          ctx
        ),
    }),
  ]);

  const gym = gymsResponse.gymReadInfos?.[0];

  if (!gym) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...localization,
      dehydratedState: dehydrate(queryClient),
      gym,
    },
  };
});
