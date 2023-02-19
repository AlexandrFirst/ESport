import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { CreateCompetitionFormCard } from "@page-widgets/page-create-competition";
import { getAppServerSideProps } from "@app/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppLanguage } from "@shared/enums/app-language";

interface CreateProps {}

const CreateCompetitionPage: NextPage<CreateProps> = () => {
  return (
    <MainLayout>
      <CreateCompetitionFormCard />
    </MainLayout>
  );
};

export default CreateCompetitionPage;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? AppLanguage.Eng,
    ["common"]
  );
  return {
    props: {
      ...localization,
    },
  };
});
