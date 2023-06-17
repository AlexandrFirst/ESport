import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";
import { getAppServerSideProps } from "@/shared/lib";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GymApi } from "@/entities/gym";

type GymsProps = PageProps & {};

const Gyms: AppNextPage<GymsProps> = () => {
  return <div>Gyms</div>;
};

Gyms.getLayout = getMainLayout({
  headProps: { title: "Gyms | E-Sport" },
});

export default Gyms;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  console.log("===ctx.params===", ctx.params);

  const api = await GymApi(ctx);
  const { data } = await api.gymListing({
    page: 1,
    pageSize: 10,
    gymIds: [],
    organisationIds: [],
  });

  return {
    props: {
      ...localization,
      gyms: data.gymReadInfos,
    },
  };
});
