import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Languages } from "@/shared/constants";
import { TwoItemsGridContainer } from "@/shared/ui";
import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { getMainLayout } from "@/widgets/MainLayout";

import {
  AboutInfo,
  IOldProfileToRemove,
  IProfile,
  IProfileInfo,
  OverviewCard,
  ProfileMainInfo,
} from "@/entities/profile";

type ProfileProps = PageProps & {
  profile: IProfile;
  oldProfile?: IOldProfileToRemove;
};

const Profile: AppNextPage<ProfileProps> = ({ profile, error, oldProfile }) => {
  return (
    <>
      <ProfileMainInfo profile={oldProfile} />
      {/*<ProfilePagesSwitcher />*/}
      <TwoItemsGridContainer className={"mt-6"}>
        <AboutInfo profile={profile.userIdentityInfo} />
        <OverviewCard />
      </TwoItemsGridContainer>
    </>
  );
};

Profile.getLayout = getMainLayout({
  headProps: { title: `Profile | E-Sport` },
});

export default Profile;

export const getServerSideProps = getAppServerSideProps<{ profile: IProfile }>(
  async (ctx, store) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? Languages.English,
      ["common", "profile"]
    );

    const { getState } = store;
    const userData = getState().user.data;
    // const { data } = await ProfileApi(ctx).getProfileInfo(userData?.id ?? "");

    const profileInfo: IProfileInfo = {
      email: "some@mail.com",
      name: "Alex",
      surname: "Logvinov",
      userId: 12,
      telephoneNumber: "+380500321255",
      photoId: null,
    };

    return {
      ...localization,
      props: {
        profile: {
          userAdminInfo: profileInfo,
          userIdentityInfo: profileInfo,
          userTraineeInfo: profileInfo,
          userTrainerInfo: profileInfo,
          userOrganisationAdminInfos: [profileInfo],
        },
      },
    };
  },
  {
    // auth: true,
  }
);
