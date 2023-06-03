import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { AppNextPage, PageProps } from "@/shared/types";
import { Card, ErrorText, Skeleton, UILink } from "@/shared/ui";
import { getAppServerSideProps } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";
import { routes } from "@/shared/config";

import {
  CollapsableGymReadInfo,
  getGymTimetable,
  GymApi,
  gymApiKeys,
  IGymReadInfo,
  useGetGymTimetable,
} from "@/entities/gym";
import { useProfileInfo } from "@/entities/profile";
import { useAuth } from "@/entities/user";

import {
  GymCalendars,
  transformTimeTableToCalendarEvents,
} from "@/features/GymCalendars";

import { getMainLayout } from "@/widgets/MainLayout";

type GymProps = PageProps & {
  gym: IGymReadInfo;
};

const Gym: AppNextPage<GymProps> = ({ error, gym }) => {
  const router = useRouter();
  const { gymId, organisationId } = router.query;

  const { data } = useGetGymTimetable(Number(gymId ?? 0), {
    dayOfTheWeeks: [DayOfTheWeek.ALL],
  });

  const { user } = useAuth();
  const { isAdminForGyms, isProfileLoading } = useProfileInfo({
    userId: user?.id ?? 0,
    gymIds: [Number(gymId ?? 0)],
  });

  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <>
      <Card>
        <CollapsableGymReadInfo
          gym={gym}
          rightTop={
            isProfileLoading ? (
              <Skeleton className={"w-[40px] h-[20px] rounded-full"} />
            ) : (
              isAdminForGyms && (
                <UILink
                  href={routes.Organisation.EditGym([
                    organisationId as string,
                    gymId as string,
                  ])}
                >
                  Edit
                </UILink>
              )
            )
          }
        />
      </Card>
      <GymCalendars
        className={"mt-10"}
        calendarEvents={transformTimeTableToCalendarEvents(
          data?.gymTimeTable ?? []
        )}
      />
    </>
  );
};

Gym.getLayout = getMainLayout({
  headProps: { title: "Gym | E-Sport" },
});

export default Gym;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const { gymId } = ctx.query;

  const queryClient = new QueryClient();

  // const gymApi = GymApi(ctx);

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
        getGymTimetable(Number(gymId ?? 0), {
          dayOfTheWeeks: [DayOfTheWeek.ALL],
        }),
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
