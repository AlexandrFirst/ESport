import React from "react";
import { MainLayout } from "@features/MainLayout/MainLayout";
import { SportPageTitle } from "@components/SportPageTitle/SportPageTitle";

export const Competition: React.FC = () => {
  return (
    <MainLayout>
      <SportPageTitle textCenter>Competition</SportPageTitle>
    </MainLayout>
  );
};
