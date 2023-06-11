import { useCallback, useEffect } from "react";

import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppNextPage } from "@/shared/types";
import { useSnackbar } from "@/shared/lib";
import { routes } from "@/shared/config";

import { getMainLayout } from "@/widgets/MainLayout";
import { HomePage } from "@/widgets/HomePage";

type Props = {
  snackbar?: {
    error?: string;
    success?: string;
  };
};

const Home: AppNextPage<Props> = ({ snackbar }) => {
  const { error, success } = snackbar ?? {};

  const router = useRouter();

  const { showError, showSuccess } = useSnackbar();

  const removeSearchParams = useCallback(() => {
    router.push(routes.Home(), undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    success && showSuccess(success);
    error && showError(error);
    removeSearchParams();
  }, [showError, showSuccess]);

  return <HomePage />;
};

Home.getLayout = getMainLayout({
  headProps: { title: "E-Sport | System for sport" },
  withLeftSidebar: false,
});

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  defaultLocale,
  query,
}) => {
  const localization = await serverSideTranslations(
    locale ?? defaultLocale ?? "en",
    ["common", "home"]
  );

  return {
    props: {
      ...localization,
      snackbar: {
        error: (query?.error as string) ?? "",
        success: (query?.success as string) ?? "",
      },
    },
  };
};
