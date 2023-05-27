import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { getAppServerSideProps } from "@/shared/lib";
import { AppNextPage, PageProps } from "@/shared/types";
import { Card } from "@/shared/ui";
import { StickyContentLayout } from "@/shared/layouts";

import { GymList, IGymReadInfo } from "@/entities/gym";

import { getMainLayout } from "@/widgets/MainLayout";
import { GymsFilters } from "@/features/GymsFilters";

type GymsProps = PageProps & {
  gyms: IGymReadInfo[];
};

const Gyms: AppNextPage<GymsProps> = ({ gyms }) => {
  return (
    <StickyContentLayout
      right={
        <Card className={"border border-theme-main"}>
          <GymsFilters className={"p-2"} />
        </Card>
      }
    >
      <Card padding={"none"}>
        <GymList gyms={gyms} />
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

    const mocked_gyms: IGymReadInfo[] = [
      {
        gymId: "2",
        address: "ул. Хуенина, 1",
        onenTime: "10:00 - 22:00",
        closeTime: "12:00 - 13:00",
        organisationId: "1",
        gymSports: [
          {
            id: 1,
            name: "Футбол",
          },
          {
            id: 1,
            name: "Баскетбол",
          },
        ],
        gymTrainerInfos: [
          {
            id: 1,
            name: "Иванов Иван Иванович",
            level: "Master",
          },
        ],
      },
      {
        gymId: "1",
        address: "ул. Хуенина, 1",
        onenTime: "10:00 - 22:00",
        closeTime: "12:00 - 13:00",
        organisationId: "1",
        gymSports: [
          {
            id: 2,
            name: "Карате",
          },
        ],
        gymTrainerInfos: [
          {
            id: 1,
            name: "Иванов Иван Иванович",
            level: "Master",
          },
        ],
      },
      {
        gymId: "1",
        address: "ул. Хуенина, 1",
        onenTime: "10:00 - 22:00",
        closeTime: "12:00 - 13:00",
        organisationId: "1",
        gymSports: [
          {
            id: 2,
            name: "Карате",
          },
        ],
        gymTrainerInfos: [
          {
            id: 1,
            name: "Иванов Иван Иванович",
            level: "Master",
          },
        ],
      },
      {
        gymId: "1",
        address: "ул. Хуенина, 1",
        onenTime: "10:00 - 22:00",
        closeTime: "12:00 - 13:00",
        organisationId: "1",
        gymSports: [
          {
            id: 2,
            name: "Карате",
          },
        ],
        gymTrainerInfos: [
          {
            id: 1,
            name: "Иванов Иван Иванович",
            level: "Master",
          },
        ],
      },
      {
        gymId: "1",
        address: "ул. Хуенина, 1",
        onenTime: "10:00 - 22:00",
        closeTime: "12:00 - 13:00",
        organisationId: "1",
        gymSports: [
          {
            id: 2,
            name: "Карате",
          },
        ],
        gymTrainerInfos: [
          {
            id: 1,
            name: "Иванов Иван Иванович",
            level: "Master",
          },
        ],
      },
    ];

    return {
      props: {
        ...localization,
        gyms: mocked_gyms,
      },
    };
  }
);
