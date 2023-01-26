import { NextPage } from "next";
import React from "react";

import { Form, loginHead } from "@page-widgets/page-login";

import { Left, Main, Right } from "@layouts/UnloggedLayout";

const LoginPage: NextPage = () => {
  return (
    <Main
      headProps={loginHead}
      leftComponent={<Left />}
      rightComponent={
        <Right
          title="Welcome to E-Sport 👋🏻"
          subtitle="Please sign-in to your account and start the adventure"
        >
          <Form />
        </Right>
      }
    />
  );
};

export default LoginPage;
