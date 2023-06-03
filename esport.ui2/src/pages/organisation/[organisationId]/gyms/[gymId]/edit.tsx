import { useState } from "react";

import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";

import { AppNextPage, CalendarEvent, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";
import { routes } from "@/shared/config";

import {
  getGymTimetable,
  GymApi,
  gymApiKeys,
  IGymReadInfo,
  useAddUpdateTimetable,
  useGetGymTimetable,
} from "@/entities/gym";
import { isAdminForGyms, ProfileApi } from "@/entities/profile";

import {
  CalendarDayTimetable,
  CalendarSheet,
  CreateUpdateShift,
  GymCalendars,
  transformCreateUpdateShiftToAddUpdateGymTimetable,
  transformTimeTableToCalendarEvents,
} from "@/features/GymCalendars";

import { getMainLayout } from "@/widgets/MainLayout";

type EditGymProps = PageProps & {
  gym: IGymReadInfo;
};

const EditGym: AppNextPage<EditGymProps> = ({ gym }) => {
  const router = useRouter();
  const { gymId, organisationId } = router.query;

  const queryClient = useQueryClient();

  const { data, isLoading: isTimetableLoading } = useGetGymTimetable(
    Number(gymId ?? 0),
    {
      dayOfTheWeeks: [DayOfTheWeek.ALL],
    }
  );
  const { mutate, isLoading: isUpdateLoading } = useAddUpdateTimetable();

  const [isSheetOpened, setIsSheetOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent<CalendarDayTimetable> | undefined
  >(undefined);

  const handleDayClick = (day: Date) => {
    setIsSheetOpened(true);
    setSelectedDate(day);
  };

  const handleCreate = async (formData: CreateUpdateShift) => {
    console.log("===formData===", formData);
    console.log(
      "===transformCreateUpdateShiftToAddUpdateGymTimetable===",
      transformCreateUpdateShiftToAddUpdateGymTimetable(
        Number(gymId),
        data?.gymTimeTable ?? [],
        formData,
        selectedDate
      )
    );
    await mutate(
      transformCreateUpdateShiftToAddUpdateGymTimetable(
        Number(gymId),
        data?.gymTimeTable ?? [],
        formData,
        selectedDate
      )
    );
    await queryClient.invalidateQueries(
      gymApiKeys.gymTimetable(Number(gymId), {
        dayOfTheWeeks: [DayOfTheWeek.ALL],
      })
    );
  };

  const handleSelectEvent = (
    event: CalendarEvent<CalendarDayTimetable>,
    day: Date
  ) => {
    setSelectedEvent(event);
    setSelectedDate(day);
    setIsSheetOpened(true);
  };

  return (
    <>
      <GymCalendars
        calendarEvents={transformTimeTableToCalendarEvents(data?.gymTimeTable)}
        onDayClick={handleDayClick}
        onEventClick={handleSelectEvent}
      />
      <CalendarSheet
        gym={gym}
        open={isSheetOpened}
        setOpen={setIsSheetOpened}
        currentDate={selectedDate}
        onSubmit={handleCreate}
        isLoading={isTimetableLoading || isUpdateLoading}
        selectedEvent={selectedEvent}
        setSelectedEvent={setSelectedEvent}
      />
    </>
  );
};

EditGym.getLayout = getMainLayout({
  headProps: { title: "EditGym | E-Sport" },
});

export default EditGym;

export const getServerSideProps = getAppServerSideProps(async (ctx, store) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const { gymId, organisationId } = ctx.query;
  const { user } = store.getState();

  const queryClient = new QueryClient();

  // const gymApi = GymApi(ctx);

  const [{ data: gymsResponse }, { data: profile }] = await Promise.all([
    GymApi(ctx).gymListing({
      organisationIds: [],
      gymIds: [Number(gymId ?? 0)],
      page: 1,
      pageSize: 1,
    }),
    ProfileApi(ctx).getProfileInfo(user.data?.id ?? 0),
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

  const isAdminForGym = isAdminForGyms(profile, [Number(gymId ?? 0)]);
  const gym = gymsResponse.gymReadInfos?.[0];

  if (!gym) {
    return {
      notFound: true,
    };
  }

  if (!isAdminForGym) {
    return {
      redirect: {
        destination: routes.Organisation.Gym([
          organisationId as string,
          gymId as string,
        ]),
      },
      props: {},
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
