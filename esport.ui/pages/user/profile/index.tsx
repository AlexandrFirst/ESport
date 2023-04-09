import React from "react";

import { NextPage } from "next";
import { AppPageProps } from "@app/Providers";

import { getAppServerSideProps } from "@shared/lib";
import TwoItemsGridContainer from "@shared/ui/TwoItemsGridContainer/TwoItemsGridContainer";

import { MainLayout } from "@layouts/MainLayout";

import {
  AboutInfo,
  OverviewCard,
  Profile,
  ProfileMainInfo,
} from "@entities/profile";

import { ProfilePagesSwitcher } from "@page-widgets/page-profile";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "@shared/enums/app-language";

type ProfileProps = AppPageProps & {
  profile: Profile;
};

const Profile: NextPage<ProfileProps> = ({ profile }) => {
  return (
    <MainLayout>
      <ProfileMainInfo profile={profile} />
      <ProfilePagesSwitcher />
      <TwoItemsGridContainer className={"mt-6"}>
        <AboutInfo profile={profile} />
        <OverviewCard />
      </TwoItemsGridContainer>
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps = getAppServerSideProps<ProfileProps>(
  async (ctx) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? AppLanguage.Eng,
      ["profile"]
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
  }
);
