import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

import { UserRole } from "@/entities/user";

export type AppNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth?: UserRole[] | boolean;
};

export interface AppPageProps extends AppProps {
  Component: AppNextPage;
}
