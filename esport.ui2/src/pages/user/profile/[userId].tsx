import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { Languages } from "@/shared/constants";
import { TwoItemsGridContainer } from "@/shared/ui";

import {
  AboutInfo,
  IProfile,
  IProfileInfo,
  OverviewCard,
  ProfileMainInfo,
} from "@/entities/profile";

import { getMainLayout } from "@/widgets/MainLayout";
import { useAuth } from "@/entities/user";

type ProfileProps = PageProps & {
  profile: IProfile;
};

const Profile: AppNextPage<ProfileProps> = ({ profile }) => {
  const router = useRouter();
  const { user } = useAuth();

  const userId = router.query?.userId as string;

  return (
    <>
      <ProfileMainInfo profile={profile} editable={userId === user?.id} />
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
  async (ctx) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? Languages.English,
      ["common", "profile"]
    );

    // const userId = ctx.query?.userId as string;
    // const { data } = await ProfileApi(ctx).getProfileInfo(userId ?? "");
    // console.log("===data===", data);

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
  }
);
