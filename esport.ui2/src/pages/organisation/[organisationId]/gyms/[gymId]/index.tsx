import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, QueryClient, useQueryClient } from "@tanstack/react-query";

import { AppNextPage, CalendarEvent, PageProps } from "@/shared/types";
import { Card, ErrorText, UILink } from "@/shared/ui";
import { getAppServerSideProps, useSnackbar } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";

import {
  CollapsableGymReadInfo,
  getGymTimetable,
  GymApi,
  gymApiKeys,
  IGymReadInfo,
  useAddUpdateTimetable,
  useCreateTrainerRequest,
  useGetGymTimetable,
} from "@/entities/gym";
import {
  getProfileInfo,
  profileApiKeys,
  useProfileInfo,
} from "@/entities/profile";
import { useAuth } from "@/entities/user";

import {
  CalendarDayTimetable,
  CalendarSheet,
  CreateUpdateShiftWithTrainerRequest,
  GymCalendars,
  transformCreateUpdateShiftToAddUpdateGymTimetable,
  transformTimeTableToCalendarEvents,
} from "@/features/GymCalendars";

import { getMainLayout } from "@/widgets/MainLayout";
import { useState } from "react";
import { routes } from "@/shared/config";

type GymProps = PageProps & {
  gym: IGymReadInfo;
};

const Gym: AppNextPage<GymProps> = ({ error, gym }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useSnackbar();

  const { gymId, organisationId } = router.query;

  const { data, isLoading: isTimetableLoading } = useGetGymTimetable(
    Number(gymId ?? 0),
    {
      dayOfTheWeeks: [DayOfTheWeek.ALL],
    }
  );
  const { mutate: mutateAddUpdateTimetable, isLoading: isUpdateLoading } =
    useAddUpdateTimetable();
  const {
    mutate: mutateCreateTrainerRequest,
    isLoading: isCreateRequestLoading,
  } = useCreateTrainerRequest();

  const [isSheetOpened, setIsSheetOpened] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<
    CalendarEvent<CalendarDayTimetable> | undefined
  >(undefined);

  const { user } = useAuth();
  const { isAdminForGyms, profileOrganisationId } = useProfileInfo({
    userId: user?.id ?? 0,
    gymIds: [Number(gymId ?? 0)],
  });

  const handleDayClick = (day: Date) => {
    setIsSheetOpened(true);
    setSelectedDate(day);
  };

  const onSuccess = async () => {
    await queryClient.invalidateQueries({
      queryKey: gymApiKeys.gymTimetable(Number(gymId), {
        dayOfTheWeeks: [DayOfTheWeek.ALL],
      }),
    });
    showSuccess("Timetable has been added successfully");
  };

  const onError = (e: any) => {
    showError(e?.[0] ?? e?.message ?? "Something went wrong");
  };

  const handleSubmit = async (
    formData: CreateUpdateShiftWithTrainerRequest
  ) => {
    await mutateAddUpdateTimetable(
      transformCreateUpdateShiftToAddUpdateGymTimetable({
        gymId: Number(gymId),
        gymTimetable: data?.gymTimeTable ?? [],
        selectedDate,
        selectedEvent,
        data: formData,
      }),
      { onSuccess, onError }
    );
    if (formData.trainerRequest) {
      await mutateCreateTrainerRequest(
        {
          gymId: Number(gymId),
          shiftId: selectedEvent?.data?.shiftId ?? 0,
          description: formData.trainerRequest,
        },
        {
          onError,
        }
      );
    }
  };

  const handleDelete = async (event?: CalendarEvent<CalendarDayTimetable>) => {
    // const a = transformCreateUpdateShiftToAddUpdateGymTimetable({
    //   gymId: Number(gymId),
    //   gymTimetable: data?.gymTimeTable ?? [],
    //   selectedDate,
    //   selectedEvent,
    //   shiftToDelete: event?.data,
    // });
    //
    // console.log("===a===", a);
    await mutateAddUpdateTimetable(
      transformCreateUpdateShiftToAddUpdateGymTimetable({
        gymId: Number(gymId),
        gymTimetable: data?.gymTimeTable ?? [],
        selectedDate,
        selectedEvent,
        shiftToDelete: event?.data,
      }),
      { onSuccess, onError }
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

  const hasEditRights =
    isAdminForGyms || profileOrganisationId === Number(organisationId);

  if (error) return <ErrorText>{error}</ErrorText>;

  return (
    <>
      <Card>
        <CollapsableGymReadInfo
          gym={gym}
          rightTop={
            hasEditRights && (
              <UILink
                href={routes.Organisation.GymTrainerRequests([
                  organisationId as string,
                  gymId as string,
                ])}
              >
                See trainers applied to requests
              </UILink>
            )
          }
        />
      </Card>
      <GymCalendars
        className={"mt-10"}
        calendarEvents={transformTimeTableToCalendarEvents(data?.gymTimeTable)}
        onDayClick={hasEditRights ? handleDayClick : undefined}
        onEventClick={hasEditRights ? handleSelectEvent : undefined}
      />
      {hasEditRights && (
        <CalendarSheet
          gym={gym}
          open={isSheetOpened}
          setOpen={setIsSheetOpened}
          currentDate={selectedDate}
          onSubmit={handleSubmit}
          isLoading={
            isTimetableLoading || isUpdateLoading || isCreateRequestLoading
          }
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          workingHours={data?.gymWorkingHours?.[0]}
          onRemove={handleDelete}
        />
      )}
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
  const { gymId } = ctx.query;

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
        getGymTimetable(Number(gymId ?? 0), {
          dayOfTheWeeks: [DayOfTheWeek.ALL],
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: profileApiKeys.getProfileById(userId),
      queryFn: async () => getProfileInfo(userId),
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
