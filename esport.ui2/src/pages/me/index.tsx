import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { IProfile, ProfileApi } from "@/entities/profile";

import { getMainLayout } from "@/widgets/MainLayout";
import {
  ProfileInformation,
  profileInformationActions,
} from "@/widgets/ProfileInformation";
import { ErrorText } from "@/shared/ui";

type MeProps = PageProps & {
  profile: IProfile;
};

const Me: AppNextPage<MeProps> = ({ profile, error }) => {
  if (error) return <ErrorText>{error}</ErrorText>;
  return <ProfileInformation profile={profile} withEditBtn />;
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
    store.dispatch(profileInformationActions.setCurrentProfile(profile));

    return {
      props: {
        ...localization,
        profile,
      },
    };
  }
);
