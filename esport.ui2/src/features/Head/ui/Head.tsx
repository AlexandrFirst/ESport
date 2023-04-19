import NextHead from "next/head";
import React, { FC } from "react";

export type HeadProps = { headProps?: HeadComponentProps };

interface HeadComponentProps {
  title?: string;
  keywords?: string;
}

export const Head: FC<HeadComponentProps> = ({ title, keywords }) => {
  return (
    <NextHead>
      <title>{title ?? "E - Sport"}</title>
      <meta
        name="keywords"
        content={`e-sport sport organization ${keywords ?? ""}`.trim()}
      />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
    </NextHead>
  );
};
