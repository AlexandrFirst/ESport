import { GetServerSidePropsContext, NextPageContext } from "next";

export type ApiContext = Pick<
  NextPageContext | GetServerSidePropsContext,
  "req" | "res"
>;
