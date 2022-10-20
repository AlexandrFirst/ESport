import Head from "next/head";
import React, { ReactNode } from "react";

import { TopPageLoader } from "@shared/TopPageLoader/TopPageLoader";

interface MainProps {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
  title?: string;
  keywords?: string;
}

export const Main: React.FC<MainProps> = ({
  leftComponent,
  rightComponent,
  title,
  keywords,
}) => {
  return (
    <>
      <Head>
        <title>{title ?? "E - Sport"}</title>
        <meta
          name="keywords"
          content={`e-sport sport organization ${keywords}`.trim()}
        />
      </Head>
      <TopPageLoader />
      <main className=" flex bg-skin-main h-full min-h-screen">
        {leftComponent}
        {rightComponent}
      </main>
    </>
  );
};
