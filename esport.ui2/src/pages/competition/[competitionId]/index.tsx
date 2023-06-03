import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import {
  CompetitionGrid,
  ICompetitonWithCategories,
} from "@/entities/competition";

import { getMainLayout } from "@/widgets/MainLayout";
import { Title } from "@/shared/ui";

type CompetitionPageProps = {
  competition?: ICompetitonWithCategories;
};

const CompetitionPage: AppNextPage<CompetitionPageProps> = ({
  competition,
}) => {
  const tmp = competition?.categories[0];

  return (
    <>
      {/*<Title>Categories</Title>*/}
      <Title className={"ml-4"}>{tmp?.title}</Title>
      <CompetitionGrid category={tmp} />
    </>
  );
};

CompetitionPage.getLayout = getMainLayout();

export default CompetitionPage;

export const getServerSideProps = getAppServerSideProps(async (ctx) => {
  const localization = await serverSideTranslations(
    ctx.locale ?? ctx.defaultLocale ?? "en",
    ["common"]
  );
  const competitionId = ctx.params?.competitionId as string;

  // const { data } = await CompetitionApi(ctx).getCompetition(competitionId);
  const data = {
    competition: {
      _id: "64492f90e4f612d8e099d517",
      title: "Міжнародний турнір у Києві",
      dateStart: "2023-01-05T18:32:29.498Z",
      organizationId: 1,
      categories: [
        {
          _id: "64492f90e4f612d8e099d515",
          rounds: [
            {
              _id: "64492f90e4f612d8e099d513",
              roundNumber: 1,
              fights: [
                {
                  _id: "64492f90e4f612d8e099d511",
                  isProcessed: false,
                  fightNumber: 1,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Микита Левченко",
                    },
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Михайло Зоряний",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d512",
                  isProcessed: false,
                  fightNumber: 2,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Ігор Кравцов",
                    },
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Олександр Церковний",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d513",
                  isProcessed: false,
                  fightNumber: 3,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Михайло Зірка",
                    },
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Томас Шевченко",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d512",
                  isProcessed: false,
                  fightNumber: 4,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Віталій Литвиненко",
                    },
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "Іван Скоропадський",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
              ],
              createdAt: "2023-04-26T14:05:00.025Z",
              updatedAt: "2023-04-26T14:05:00.025Z",
              __v: 0,
            },
            {
              _id: "64492f90e4f612d8e099d513",
              roundNumber: 2,
              fights: [
                {
                  _id: "64492f90e4f612d8e099d511",
                  isProcessed: false,
                  fightNumber: 5,
                  competitors: [],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d512",
                  isProcessed: false,
                  fightNumber: 6,
                  competitors: [],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
              ],
              createdAt: "2023-04-26T14:05:00.025Z",
              updatedAt: "2023-04-26T14:05:00.025Z",
              __v: 0,
            },
            {
              _id: "64492f90e4f612d8e099d513",
              roundNumber: 3,
              fights: [
                {
                  _id: "64492f90e4f612d8e099d511",
                  isProcessed: false,
                  fightNumber: 7,
                  competitors: [],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
              ],
              createdAt: "2023-04-26T14:05:00.025Z",
              updatedAt: "2023-04-26T14:05:00.025Z",
              __v: 0,
            },
          ],
          title: "Хлопці 10-11 лет, до 60 кг",
          createdAt: "2023-04-26T14:05:00.028Z",
          updatedAt: "2023-04-26T14:05:00.028Z",
          __v: 0,
        },
      ],
      createdAt: "2023-04-26T14:05:00.029Z",
      updatedAt: "2023-04-26T14:05:00.029Z",
      __v: 0,
    },
  };

  return {
    props: {
      ...localization,
      ...data,
    },
  };
});
