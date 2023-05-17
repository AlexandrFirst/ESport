import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { Languages, UserRole } from "@/shared/constants";
import { TwoItemsGridContainer } from "@/shared/ui";

import {
  IProfile,
  IProfileInfo,
  ProfileApi,
  ProfileInfo,
  ProfileMainInfo,
} from "@/entities/profile";

import { getMainLayout } from "@/widgets/MainLayout";
import { useAuth } from "@/entities/user";
import { routes } from "@/shared/config";

type ProfileProps = PageProps & {
  profile: IProfile;
};

const Profile: AppNextPage<ProfileProps> = ({ profile }) => {
  const {
    userOrganisationAdminInfos,
    userTrainerInfo,
    userTraineeInfo,
    userAdminInfo,
  } = profile || {};

  const { user } = useAuth();
  const router = useRouter();

  const handleEdit = () => {
    router.push(routes.User.Profile.EditProfileId([user?.id]));
  };

  const userId = router.query?.userId as string;

  return (
    <>
      <ProfileMainInfo
        profile={profile}
        withEditBtn={userId === user?.id}
        onEditClick={handleEdit}
      />
      <TwoItemsGridContainer className={"mt-6"}>
        {userTraineeInfo && (
          <ProfileInfo profileInfo={userTraineeInfo} role={UserRole.Trainee} />
        )}
        {userTrainerInfo && (
          <ProfileInfo profileInfo={userTrainerInfo} role={UserRole.Trainer} />
        )}
        {userAdminInfo && (
          <ProfileInfo profileInfo={userAdminInfo} role={UserRole.GymAdmin} />
        )}
        {userOrganisationAdminInfos?.[0] && (
          <ProfileInfo
            profileInfo={userOrganisationAdminInfos[0]}
            role={UserRole.OrganisationAdmin}
          />
        )}
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

    const userId = ctx.query?.userId as string;
    const { data } = await ProfileApi(ctx).getProfileInfo(userId ?? "");
    console.log("===data===", data);

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
