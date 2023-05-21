import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";
import { ErrorText } from "@/shared/ui";

import { IProfile, ProfileApi } from "@/entities/profile";
import { useAuth } from "@/entities/user";

import { getMainLayout } from "@/widgets/MainLayout";

import {
  ProfileInformation,
  profileInformationActions,
} from "@/widgets/ProfileInformation";

type MeProps = PageProps & {
  profile: IProfile;
};

const Me: AppNextPage<MeProps> = ({ error }) => {
  const { user } = useAuth();

  if (error) return <ErrorText>{error}</ErrorText>;
  return <ProfileInformation userId={user?.id ?? ""} />;
};

Me.getLayout = getMainLayout({
  headProps: { title: `Profile | E-Sport` },
  withFooter: true,
});

export default Me;

export const getServerSideProps = getAppServerSideProps<MeProps>(
  async (ctx, store) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common", "profile"]
    );

    const { user } = store.getState();
    const { data: profile } = await ProfileApi(ctx).getProfileInfo(
      user.data?.id ?? ""
    );
    console.log("===profile===", profile);
    store.dispatch(profileInformationActions.setCurrentProfile(profile));
    store.dispatch(profileInformationActions.setEditableProfile(profile));

    return {
      props: {
        ...localization,
      },
    };
  },
  { auth: true }
);
