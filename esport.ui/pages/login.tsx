import { GetServerSideProps, NextPage } from "next";
import React from "react";

import https from "https";
import fs from "fs";
import path from "path";

import { Form, loginHead } from "@page-widgets/page-login";

import { Left, Main, Right } from "@layouts/UnloggedLayout";

type Props = {
  httpsAgent: any;
};

export const Context = React.createContext<{ httpsAgent: any }>({
  httpsAgent: null,
});

const LoginPage: NextPage<Props> = ({ httpsAgent }) => {
  console.log(httpsAgent);
  return (
    <Main
      headProps={loginHead}
      leftComponent={<Left />}
      rightComponent={
        <Context.Provider value={{ httpsAgent }}>
          <Right
            title="Welcome to E-Sport 👋🏻"
            subtitle="Please sign-in to your account and start the adventure"
          >
            <Form />
          </Right>
        </Context.Provider>
      }
    />
  );
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps<{
  httpsAgent: any;
}> = async () => {
  const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    cert: fs.readFileSync(path.resolve(".cerfs", "fullchain.pem")),
    key: fs.readFileSync(path.resolve(".cerfs", "privkey.pem")),
    passphrase: "1234",
  });

  return { props: { httpsAgent: JSON.stringify(httpsAgent) } };
};
