import { ParsedUrlQuery } from "querystring";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next/types";

import { StateSchemaStore } from "./store";

import { UserRole } from "@/shared/constants";

export type AppServerSideConfig = {
  roles?: UserRole[];
  auth?: true;
};

export type GetServerSidePropsWithStore<
  Props extends { [key: string]: any } = { [key: string]: any },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData
> = (
  context: GetServerSidePropsContext<Params, Preview>,
  store: StateSchemaStore
) => Promise<GetServerSidePropsResult<Props>>;
