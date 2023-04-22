import React from "react";

import { GetServerSideProps, NextPage } from "next";

import { Languages } from "@/shared/constants";
import { TwoItemsGridContainer } from "@/shared/ui";

import { MainLayout } from "@/widgets/MainLayout";

import {
  AboutInfo,
  IProfile,
  OverviewCard,
  ProfileMainInfo,
} from "@/entities/profile";

// import { ProfilePagesSwitcher } from "@page-widgets/page-profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import { AppLanguage } from "@shared/enums/app-language";

type ProfileProps = {
  profile: IProfile;
};

const Profile: NextPage<ProfileProps> = ({ profile }) => {
  return (
    <MainLayout>
      <ProfileMainInfo profile={profile} />
      {/*<ProfilePagesSwitcher />*/}
      <TwoItemsGridContainer className={"mt-6"}>
        <AboutInfo profile={profile} />
        <OverviewCard />
      </TwoItemsGridContainer>
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
};
