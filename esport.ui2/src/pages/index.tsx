import { useCallback, useEffect } from "react";

import { GetServerSideProps } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { SubTitle, Title } from "@/shared/ui";
import { AppNextPage } from "@/shared/types";
import { useSnackbar } from "@/shared/lib";

import { getMainLayout } from "@/widgets/MainLayout";
import { useRouter } from "next/router";
import { routes } from "@/shared/config";

type Props = {
  snackbar?: {
    error?: string;
    success?: string;
  };
};

const Home: AppNextPage<Props> = ({ snackbar }) => {
  const { error, success } = snackbar ?? {};
  const { t } = useTranslation("common");

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

  return (
    <>
      <Title center>{t("title")}</Title>
      <SubTitle className={"mt-5"}>It is main page of really cool app</SubTitle>
    </>
  );
};

Home.getLayout = getMainLayout({
  headProps: { title: "E-Sport | Main" },
});

export default Home;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
  defaultLocale,
  query,
}) => {
  const localization = await serverSideTranslations(
    locale ?? defaultLocale ?? "en",
    ["common"]
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
