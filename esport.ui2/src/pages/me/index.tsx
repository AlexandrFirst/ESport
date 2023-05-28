import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { ErrorText } from "@/shared/ui";

import { ProfileApi } from "@/entities/profile";
import { useAuth } from "@/entities/user";

import { getMainLayout } from "@/widgets/MainLayout";

import {
  ProfileInformation,
  profileInformationActions,
  roleProfileInformationActions,
} from "@/widgets/ProfileInformation";

type MeProps = PageProps;

const Me: AppNextPage<MeProps> = ({ error }) => {
  const { user } = useAuth();

  if (error) return <ErrorText>{error}</ErrorText>;
  return <ProfileInformation userId={user?.id ?? 0} />;
};

Me.getLayout = getMainLayout({
  headProps: { title: `Profile | E-Sport` },
  withFooter: true,
});

export default Me;

export const getServerSideProps = getAppServerSideProps(
  async (ctx, store) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common", "profile"]
    );

    const { user } = store.getState();
    const { data: profile } = await ProfileApi(ctx).getProfileInfo(
      user.data?.id ?? 0
    );
    console.log("===profile===", profile);

    store.dispatch(profileInformationActions.setInitialData(profile));
    store.dispatch(
      roleProfileInformationActions.setInitialData({
        trainerSports: profile.userTrainerInfo?.trainerSportInfos ?? [],
        gymAdminGyms: profile.userAdminInfo?.userGyms ?? [],
        organisationAdminOrganisationId:
          profile.userOrganisationAdminInfos?.[0]?.organisationId ?? 0,
      })
    );

    return {
      props: {
        ...localization,
      },
    };
  },
  { auth: true }
);
