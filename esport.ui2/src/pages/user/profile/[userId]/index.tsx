import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { Languages } from "@/shared/constants";

import { IProfile, IProfileInfo, ProfileApi } from "@/entities/profile";

import { getMainLayout } from "@/widgets/MainLayout";
import { useAuth } from "@/entities/user";
import { routes } from "@/shared/config";
import { ProfileInformation } from "@/widgets/ProfileInformation";

type ProfileProps = PageProps & {
  profile: IProfile;
};

const Profile: AppNextPage<ProfileProps> = ({ profile }) => {
  const { isOrganisationAdmin } = useAuth();
  const router = useRouter();

  const userId = router.query?.userId as string;

  const handleEdit = () => {
    router.push(routes.User.Profile.EditProfileId([userId]));
  };

  return (
    <ProfileInformation
      // profile={profile}
      withEditBtn={isOrganisationAdmin}
      onEditClick={handleEdit}
      userId={Number(userId)}
    />
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

  const userId = ctx.query?.userId as string;
  const { data: profile } = await ProfileApi(ctx).getProfileInfo(
    Number(userId ?? 0)
  );

  const profileInfo: IProfileInfo = {
    isProfileConfirmed: false,
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
      },
    },
  };
});
