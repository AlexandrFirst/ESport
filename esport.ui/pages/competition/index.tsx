import React from "react";
import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { competitionApi, ICompetition } from "@entities/competition";

import { CompetitionsGrid } from "@page-widgets/page-all-competitions";
import { wrapper } from "@app/store/store";

type PageProps = {
  competitions: ICompetition[];
};

const CompetitionPage: NextPage<PageProps> = ({ competitions }) => {
  return (
    <MainLayout>
      <CompetitionsGrid competitions={competitions} />
    </MainLayout>
  );
};

export default CompetitionPage;

export const getServerSideProps = wrapper.getServerSideProps<PageProps>(
  (store) =>
    async ({ query }) => {
      console.log(
        "===store.getState===",
        store.getState().layout.isSidebarOpened
      );
      try {
        const competitions = await competitionApi.getAllCompetitions({
          search: query.q as string,
        });
        return {
          props: {
            sidebarOpened: store.getState?.()?.layout?.isSidebarOpened ?? false,
            competitions: competitions ?? [],
          },
        };
      } catch (e) {
        return {
          props: {
            competitions: [],
          },
        };
      }
    }
);

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   query,
// }) => {
//   try {
//     const competitions = await competitionApi.getAllCompetitions({
//       search: query.q as string,
//     });
//     return {
//       props: {
//         competitions: competitions ?? [],
//       },
//     };
//   } catch (e) {
//     return {
//       props: {
//         competitions: [],
//         isError: true,
//       },
//     };
//   }
// };
