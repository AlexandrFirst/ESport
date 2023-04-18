import { useSnackbar } from "@/features/Snackbar";
import { Card } from "@/shared/ui";

import styles from "@/styles/Home.module.css";

import { MainLayout } from "@/widgets/MainLayout";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect } from "react";

type Props = {
  snackbar?: {
    error?: string;
    success?: string;
  };
};

export default function Home({ snackbar }: Props) {
  const { error, success } = snackbar ?? {};
  const { t } = useTranslation("common");

  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    success && showSuccess(success);
    error && showError(error);
  }, [showError, showSuccess]);

  return (
    <MainLayout>
      <Card>Card content</Card>
      <h1>{t("title")}</h1>
      <h1 className={styles.text}>Typography</h1>
      <h2>Typography</h2>
      <h3>Typography</h3>
      <h4>Typography</h4>
      <h5>Typography</h5>
      <h6>Typography</h6>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
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
        error: query?.error ?? "",
        sucsess: query?.sucsess ?? "",
      },
    },
  };
};
