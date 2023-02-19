import React from "react";
import { NextPage } from "next";

import { MainLayout } from "@layouts/MainLayout";

import { ICompetition } from "@entities/competition";

import { CompetitionsGrid } from "@page-widgets/page-all-competitions";
import { getAppServerSideProps } from "@app/store/lib/getAppServerSideProps";

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

export const getServerSideProps = getAppServerSideProps<PageProps>(async () => {
  const data = await new Promise<{ competitions: ICompetition[] }>((resolve) =>
    resolve({ competitions: [] })
  );

  return {
    props: data,
  };
});

// export const getServerSideProps = wrapper.getServerSideProps<PageProps>(
//   (store) =>
//     async ({ query }) => {
//       updateSidebarState(store);
//       try {
//         const competitions = await competitionApi.getAllCompetitions({
//           search: query.q as string,
//         });
//         return {
//           props: {
//             competitions: competitions ?? [],
//           },
//         };
//       } catch (e) {
//         return {
//           props: {
//             competitions: [],
//           },
//         };
//       }
//     }
// );

// export const getServerSideProps: GetServerSideProps<PageProps> = async ({
//   query,
// }) => {
//   return {
//     redirect: {
//       destination: "/",
//       permanent: true,
//     },
//   };
// };
