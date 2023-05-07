import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { AppNextPage } from "@/shared/types";
import { getAppServerSideProps } from "@/shared/lib";

import {
  CompetitionGrid,
  ICompetitonWithCategories,
} from "@/entities/competition";

import { getMainLayout } from "@/widgets/MainLayout";

type CompetitionPageProps = {
  competition?: ICompetitonWithCategories;
};

const CompetitionPage: AppNextPage<CompetitionPageProps> = ({
  competition,
}) => {
  const tmp = competition?.categories[0];
  console.log("===tmp===", tmp);
  return (
    <>
      {/*<Title>Categories</Title>*/}
      <>{tmp?.title}</>
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
      title: "опупительные соревнования2",
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
                  fightNumber: 10,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "6449388e8524824166f030c4",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d512",
                  isProcessed: false,
                  fightNumber: 10,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "6449388e8524824166f030c4",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d513",
                  isProcessed: false,
                  fightNumber: 10,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "6449388e8524824166f030c4",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d512",
                  isProcessed: false,
                  fightNumber: 10,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "6449388e8524824166f030c4",
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
                  fightNumber: 10,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "6449388e8524824166f030c4",
                    },
                  ],
                  createdAt: "2023-04-26T14:05:00.033Z",
                  updatedAt: "2023-04-26T14:05:00.033Z",
                  __v: 0,
                },
                {
                  _id: "64492f90e4f612d8e099d512",
                  isProcessed: false,
                  fightNumber: 10,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "6449388e8524824166f030c4",
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
              roundNumber: 3,
              fights: [
                {
                  _id: "64492f90e4f612d8e099d511",
                  isProcessed: false,
                  fightNumber: 10,
                  competitors: [
                    {
                      teamMemberIds: [],
                      competitorType: "Male",
                      createdAt: "2023-04-26T14:05:00.032Z",
                      updatedAt: "2023-04-26T14:05:00.032Z",
                      userId: "6449388e8524824166f030c4",
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
