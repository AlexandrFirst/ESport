import { NextPage } from "next";
import React from "react";

import { Form, registerHead } from "@page-widgets/page-register";

import { Left, Main, Right } from "@layouts/UnloggedLayout";

const RegisterPage: NextPage = () => {
  return (
    <Main
      headProps={registerHead}
      leftComponent={<Left />}
      rightComponent={
        <Right
          title="Adventure starts here 🚀"
          subtitle="Please sign-in to your account and start the adventure"
        >
          <Form />
        </Right>
      }
    />
  );
};

export default RegisterPage;
