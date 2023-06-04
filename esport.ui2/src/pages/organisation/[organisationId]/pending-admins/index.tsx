import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage, PageProps } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import { PendingAdminsTable } from "@/features/PendingAdminsTable";

import { getMainLayout } from "@/widgets/MainLayout";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
  AdminType,
  getPendingAdmins,
  profileApiKeys,
} from "@/entities/profile";

type PendingAdminsProps = PageProps & {};

const PendingAdmins: AppNextPage<PendingAdminsProps> = () => {
  return <PendingAdminsTable />;
};

PendingAdmins.getLayout = getMainLayout({
  headProps: { title: "PendingAdmins | E-Sport" },
});

export default PendingAdmins;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: profileApiKeys.getPendingAdmins(AdminType.OrgAdmin),
    queryFn: () =>
      getPendingAdmins(
        { adminType: AdminType.OrgAdmin, page: 1, pageSize: 100 },
        ctx
      ),
  });

  return {
    props: {
      ...localization,
      dehydratedState: dehydrate(queryClient),
    },
  };
});
