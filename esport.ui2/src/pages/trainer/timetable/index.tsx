import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { AppNextPage, PageProps } from "@/shared/types";

import { getAppServerSideProps } from "@/shared/lib";
import {
  getTrainerTimetable,
  GetTrainerTimetableRequest,
  trainerApiKeys,
} from "@/entities/trainer";
import { ProfileApi } from "@/entities/profile";

import { useCurrentUserProfileInfo } from "@/features/CurrentUserProfileInfo";

import { getMainLayout } from "@/widgets/MainLayout";
import { TrainerTimetable } from "@/features/TrainerTimetable";

type TimetableProps = PageProps & {};

const Timetable: AppNextPage<TimetableProps> = () => {
  const { trainerId } = useCurrentUserProfileInfo();

  return <TrainerTimetable trainerId={trainerId} />;
};

Timetable.getLayout = getMainLayout({
  headProps: { title: "Trainer Timetable | E-Sport" },
});

export default Timetable;

export const getServerSideProps = getAppServerSideProps(async (ctx, store) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const queryClient = new QueryClient();
  const { user } = store.getState();
  const { data } = await ProfileApi(ctx).getProfileInfo(user.data?.id ?? 0);

  const request: GetTrainerTimetableRequest = {
    trainerId: data?.userTrainerInfo?.userId ?? 0,
    startDateTime: new Date().toLocaleDateString(),
    dayRange: 30,
  };

  await queryClient.prefetchQuery({
    queryKey: trainerApiKeys.getTimetable(request),
    queryFn: () => getTrainerTimetable(request),
  });

  return {
    props: {
      ...localization,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
