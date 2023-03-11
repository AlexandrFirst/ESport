import React from "react";

import { NextPage } from "next";
import { MainLayout } from "@layouts/MainLayout";
import { getAppServerSideProps } from "@shared/lib";

import { ProfilePhoto } from "@entities/profile";

const Profile: NextPage = () => {
  return (
    <MainLayout>
      <ProfilePhoto
        src={
          "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/avatars/1.png"
        }
      />
    </MainLayout>
  );
};

export default Profile;

export const getServerSideProps = getAppServerSideProps(async () => {
  return {
    props: {},
  };
});
