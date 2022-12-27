import React from "react";
import Head from "next/head";

export type SportHeadProps = { headProps?: SportHeadComponentProps };

export interface SportHeadComponentProps {
  title?: string;
  keywords?: string;
}

export const SportHead: React.FC<SportHeadComponentProps> = ({
  title,
  keywords,
}) => {
  return (
    <Head>
      <title>{title ?? "E - Sport"}</title>
      <meta
        name="keywords"
        content={`e-sport sport organization ${keywords ?? ""}`.trim()}
      />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </Head>
  );
};
