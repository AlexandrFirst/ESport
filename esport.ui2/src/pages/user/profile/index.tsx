import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Languages } from "@/shared/constants";
import { TwoItemsGridContainer } from "@/shared/ui";

import { getMainLayout } from "@/widgets/MainLayout";

import {
  AboutInfo,
  IProfile,
  OverviewCard,
  ProfileMainInfo,
} from "@/entities/profile";

import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

type ProfileProps = {
  profile?: IProfile;
};

const Profile: AppNextPage<ProfileProps> = ({ profile }) => {
  console.log("===profile===", profile);
  return (
    <>
      <ProfileMainInfo profile={profile} />
      {/*<ProfilePagesSwitcher />*/}
      <TwoItemsGridContainer className={"mt-6"}>
        <AboutInfo profile={profile} />
        <OverviewCard />
      </TwoItemsGridContainer>
    </>
  );
};

Profile.getLayout = getMainLayout({
  headProps: { title: `Profile | E-Sport` },
});

export default Profile;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? Languages.English,
    ["common", "profile"]
  );

  return {
    props: {
      ...localization,
      profile: {
        fullName: "Sasha Logvinov",
        level: "Черный пояс",
        location: "Київ",
        lastLogin: new Date().toLocaleDateString(),
        country: "Україна",
        contacts: {
          email: {
            title: "someemail@a.c",
            link: "",
          },
          telegram: {
            title: "@someuser",
            link: "",
          },
          phone: {
            title: "+380000000000",
            link: "",
          },
          instagram: {
            title: "@someuser",
            link: "",
          },
        },
      },
    },
  };
});
