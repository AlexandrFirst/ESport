import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

import { Languages } from "@/shared/constants";
import { TwoItemsGridContainer } from "@/shared/ui";

import { MainLayout } from "@/widgets/MainLayout";

import {
  AboutInfo,
  IProfile,
  OverviewCard,
  ProfileMainInfo,
} from "@/entities/profile";

import { AppNextPage } from "@/shared/types";
import { UserRole } from "@/entities/user";

type ProfileProps = {
  profile?: IProfile;
};

const Profile: AppNextPage<ProfileProps> = ({ profile }) => {
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

Profile.auth = [UserRole.Admin];

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
