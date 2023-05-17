import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { getMainLayout } from "@/widgets/MainLayout";
import { routes } from "@/shared/config";
import { IProfile, ProfileApi, ProfileMainInfo } from "@/entities/profile";
import { EditProfileForm } from "@/features/EditProfileForm";
import { Toggle } from "@/shared/ui";
import { useState } from "react";

type EditProps = PageProps & {
  profile: IProfile;
};

const Edit: AppNextPage<EditProps> = ({ profile }) => {
  const [e, setE] = useState(false);
  return (
    <>
      <Toggle enabled={e} setEnabled={setE} />
      <ProfileMainInfo profile={profile} editable />
      <EditProfileForm profile={profile} />
    </>
  );
};

Edit.getLayout = getMainLayout({
  headProps: { title: `Profile | E-Sport` },
});

export default Edit;

export const getServerSideProps = getAppServerSideProps<{ profile: IProfile }>(
  async (ctx, store) => {
    const userId = ctx.query?.userId as string;
    const { user } = store.getState();
    const { data: profile } = await ProfileApi(ctx).getProfileInfo(
      userId ?? ""
    );

    if (userId !== user.data?.id) {
      return {
        redirect: {
          destination: routes.User.Profile.ProfileId([userId]),
          permanent: true,
        },
      };
    }

    // const profileInfo: IProfileInfo = {
    //   email: "some@mail.com",
    //   name: "Alex",
    //   surname: "Logvinov",
    //   userId: 12,
    //   telephoneNumber: "+380500321255",
    //   photoId: null,
    // };

    return {
      props: {
        profile,
      },
    };
  }
);
