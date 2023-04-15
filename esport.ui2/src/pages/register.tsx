import { NextPage } from "next";
import React from "react";

import { AnonLayout } from "@/widgets/AnonLayout";
import { LoginForm } from "@/features/LoginForm";

type Props = {};

const RegisterPage: NextPage<Props> = () => {
  return (
    <AnonLayout
      title="Welcome to E-Sport 👋🏻"
      subtitle="Please sign-in to your account and start the adventure"
    >
      <LoginForm />
    </AnonLayout>
  );
};

export default RegisterPage;
