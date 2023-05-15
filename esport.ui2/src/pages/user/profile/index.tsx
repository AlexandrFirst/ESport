import React from "react";
import { AppNextPage, PageProps } from "@/shared/types";

import { getMainLayout } from "@/widgets/MainLayout";

type ProfileProps = PageProps & {};

const Profile: AppNextPage<ProfileProps> = () => {
  return <></>;
};

Profile.getLayout = getMainLayout({
  headProps: { title: `Profile | E-Sport` },
});

export default Profile;
