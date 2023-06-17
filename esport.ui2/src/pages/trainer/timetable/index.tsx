import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { dehydrate, QueryClient } from "@tanstack/react-query";

import { AppNextPage, PageProps } from "@/shared/types";
import { UserRole } from "@/shared/constants";
import { getAppServerSideProps } from "@/shared/lib";

import {
  getTrainerTimetable,
  GetTrainerTimetableRequest,
  trainerApiKeys,
} from "@/entities/trainer";
import { ProfileApi } from "@/entities/profile";
import { useCurrentUserProfileInfo } from "@/entities/user";

import { TrainerTimetable } from "@/features/TrainerTimetable";

import { getMainLayout } from "@/widgets/MainLayout";

type TimetableProps = PageProps & {};

const Timetable: AppNextPage<TimetableProps> = () => {
  const { trainerId } = useCurrentUserProfileInfo();

  return <TrainerTimetable trainerId={trainerId} />;
};

Timetable.getLayout = getMainLayout({
  headProps: { title: "Trainer Timetable | E-Sport" },
});

export default Timetable;

export const getServerSideProps = getAppServerSideProps(
  async (ctx, store) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common"]
    );
    const queryClient = new QueryClient();
    const { user } = store.getState();
    const api = await ProfileApi(ctx);
    const { data } = await api.getProfileInfo(user.data?.id ?? 0);

    const request: GetTrainerTimetableRequest = {
      trainerId: data?.userTrainerInfo?.id ?? 0,
      startDateTime: new Date().toLocaleDateString(),
      dayRange: 30,
    };

    await queryClient.prefetchQuery({
      queryKey: trainerApiKeys.getTimetable(request),
      queryFn: () => getTrainerTimetable(request, ctx),
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
