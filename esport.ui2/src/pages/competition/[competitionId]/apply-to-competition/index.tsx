import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { PageProps, AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { getMainLayout } from "@/widgets/MainLayout";
import { useAuth, useCurrentUserProfileInfo } from "@/entities/user";

type ApplyToCompetitionProps = PageProps & {};

const ApplyToCompetition: AppNextPage<ApplyToCompetitionProps> = () => {
  const { isTrainee } = useAuth();
  const { isOrgAdminForOrganisations } = useCurrentUserProfileInfo();
  return <div>ApplyToCompetition</div>;
};

ApplyToCompetition.getLayout = getMainLayout({
  headProps: { title: "ApplyToCompetition | E-Sport" },
});

export default ApplyToCompetition;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );

  return {
    props: {
      ...localization,
    },
  };
});
