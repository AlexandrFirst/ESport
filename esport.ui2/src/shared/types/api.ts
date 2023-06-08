import { GetServerSidePropsContext, NextPageContext } from "next";

export type ApiContext = Pick<
  NextPageContext | GetServerSidePropsContext,
  "req" | "res"
>;

export interface BasePagintaionRequest {
  page: number;
  pageSize: number;
}

export interface BaseListingResult {
  page: number;
  totalItems: number;
  totalPages: number;
}
