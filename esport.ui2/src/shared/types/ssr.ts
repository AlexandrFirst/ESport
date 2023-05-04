import { ParsedUrlQuery } from "querystring";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next/types";

import { StateSchemaStore } from "@/shared/types/store";

import { UserRole } from "@/entities/user";

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
