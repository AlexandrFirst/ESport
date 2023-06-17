import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getAppServerSideProps } from "@/shared/lib";
import { AppNextPage, PageProps } from "@/shared/types";
import { Card } from "@/shared/ui";
import { StickyContentLayout } from "@/shared/layouts";
import { routes } from "@/shared/config";

import { GymApi, GymList, IGymReadInfo, useGetGyms } from "@/entities/gym";

import { GymsFilters, useSelectGymFilters } from "@/features/GymsFilters";

import { getMainLayout } from "@/widgets/MainLayout";

type GymsProps = PageProps & {
  gyms: IGymReadInfo[];
};

const Gyms: AppNextPage<GymsProps> = ({ gyms }) => {
  const router = useRouter();
  const { organisationId } = router.query;
  const { address, name, openHour, closeHour } = useSelectGymFilters();

  const { data } = useGetGyms(
    {
      page: 1,
      pageSize: 10,
      organisationIds: [Number(organisationId)],
      gymIds: [],
      address: address ?? undefined,
      name: name ?? undefined,
      openHour: openHour ?? undefined,
      closeHour: closeHour ?? undefined,
    },
    {
      enabled:
        !!organisationId && (!!address || !!name || !!openHour || !!closeHour),
    }
  );

  const handleGymClick = (gym: IGymReadInfo) => {
    router.push(routes.Organisation.Gym([organisationId as string, gym.gymId]));
  };

  return (
    <StickyContentLayout right={!!gyms?.length && <GymsFilters />}>
      <Card padding={"none"}>
        <GymList
          gyms={data?.gymReadInfos ?? gyms}
          onClickGym={handleGymClick}
          organisationId={Number(organisationId)}
          emptyStateMessage={"No gyms found"}
        />
      </Card>
    </StickyContentLayout>
  );
};

Gyms.getLayout = getMainLayout({
  headProps: { title: "Gyms | E-Sport" },
});

export default Gyms;

export const getServerSideProps = getAppServerSideProps<GymsProps>(
  async (ctx) => {
    const localization = await serverSideTranslations(
      ctx.locale ?? ctx.defaultLocale ?? "en",
      ["common"]
    );
    const { organisationId } = ctx.query;

    const api = await GymApi(ctx);
    const { data } = await api.gymListing({
      page: 1,
      pageSize: 10,
      gymIds: [],
      organisationIds: [Number(organisationId)],
    });

    return {
      props: {
        ...localization,
        gyms: data.gymReadInfos,
      },
    };
  }
);
