import { GetServerSideProps, NextPage } from "next";
import React from "react";

import https from "https";
import fs from "fs";
import path from "path";

import { AnonLayout } from "@/widgets/AnonLayout";
import { LoginForm } from "@/features/LoginForm";

type Props = {
  httpsAgent: any;
};

export const Context = React.createContext<{ httpsAgent: any }>({
  httpsAgent: null,
});

const LoginPage: NextPage<Props> = ({ httpsAgent }) => {
  return (
    <AnonLayout
      title="Welcome to E-Sport 👋🏻"
      subtitle="Please sign-in to your account and start the adventure"
    >
      <LoginForm />
    </AnonLayout>
  );
};

export default LoginPage;
