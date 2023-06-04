import { AppNextPage, PageProps } from "@/shared/types";
import { getMainLayout } from "@/widgets/MainLayout";
import { useState } from "react";
import { TrainerRequestsTable } from "@/features/TrainerRequestsTable";

type TrainerRequestsProps = PageProps & {};

const TrainerRequests: AppNextPage<TrainerRequestsProps> = () => {
  const [position, setPosition] = useState("top");

  return (
    <>
      <TrainerRequestsTable />
    </>
  );
};

TrainerRequests.getLayout = getMainLayout({
  headProps: { title: "TrainerRequests | E-Sport" },
});

export default TrainerRequests;
