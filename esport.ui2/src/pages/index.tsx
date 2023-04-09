import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";

import styles from "@/styles/Home.module.css";
import { useTheme } from "@/_app/Providers";

import { MainLayout } from "@/widgets/MainLayout";

export default function Home() {
  const { t } = useTranslation("common");
  const { toggleTheme } = useTheme();

  return (
    <MainLayout>
      <h1>{t("title")}</h1>
      <h1 className={styles.text}>Typography</h1>
      <h2>Typography</h2>
      <h3>Typography</h3>
      <h4>Typography</h4>
      <h5>Typography</h5>
      <h6>Typography</h6>
      <button onClick={toggleTheme}>Toggle</button>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  return {
    props: {
      ...localization,
    },
  };
};
