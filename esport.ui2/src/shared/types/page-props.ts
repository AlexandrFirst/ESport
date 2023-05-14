import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type AppNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface IAppPageProps extends AppProps {
  Component: AppNextPage;
}

export type AppPageProps = { [key: string]: any };

export type PageProps = {
  error?: string;
};
