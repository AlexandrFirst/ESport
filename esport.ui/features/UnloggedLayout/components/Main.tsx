import Head from "next/head";
import React, { ReactNode } from "react";

import { TopPageLoader } from "@shared/TopPageLoader/TopPageLoader";
import { SportHead, SportHeadProps } from "@shared/SportHead/SportHead";

interface MainProps extends SportHeadProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
}

export const Main: React.FC<MainProps> = ({
  headProps,
  leftComponent,
  rightComponent,
}) => {
  return (
    <>
      <SportHead {...headProps} />
      <TopPageLoader />
      <main className=" flex bg-skin-main h-full min-h-screen">
        {leftComponent}
        {rightComponent}
      </main>
    </>
  );
};
