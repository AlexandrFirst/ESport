import React, { ReactNode } from "react";

import { TopPageLoader } from "@features/TopPageLoader/TopPageLoader";
import { SportHead, SportHeadProps } from "@features/SportHead/SportHead";

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
