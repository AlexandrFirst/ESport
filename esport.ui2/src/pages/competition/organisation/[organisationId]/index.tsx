import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { PageProps, AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import {
  competitionQueryKeys,
  getCompetitionsByOrganisationId,
} from "@/entities/competition";

import { CompetitionListByOrganisation } from "../../../../_pages/(organisation)/CompetitionListByOrganisation";

import { getMainLayout } from "@/widgets/MainLayout";

type OrgCompetitionsProps = PageProps & {};

const OrgCompetitions: AppNextPage<OrgCompetitionsProps> = () => {
  return <CompetitionListByOrganisation />;
};

OrgCompetitions.getLayout = getMainLayout({
  headProps: { title: "Organisation competitions | E-Sport" },
});

export default OrgCompetitions;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const queryClient = new QueryClient();
  const { organisationId } = ctx.query;

  const orgId = Number(organisationId);

  await queryClient.prefetchQuery(
    competitionQueryKeys.byOrgId({
      orgId,
      includeClosedRegistration: ctx.query.showClosed === "true",
    }),
    () =>
      getCompetitionsByOrganisationId(
        { orgId, includeClosedRegistration: ctx.query.showClosed === "true" },
        ctx
      )
  );

  return {
    props: {
      ...localization,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
