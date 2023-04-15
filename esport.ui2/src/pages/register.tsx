import { NextPage } from "next";
import React from "react";

import { AnonLayout } from "@/widgets/AnonLayout";
import { RegisterForm } from "@/features/RegisterForm";

type Props = {};

const RegisterPage: NextPage<Props> = () => {
  return (
    <AnonLayout
      title="Adventure starts here 🚀"
      subtitle="Please sign-in to your account and start the adventure"
    >
      <RegisterForm />
    </AnonLayout>
  );
};

export default RegisterPage;
