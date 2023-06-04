import { FC } from "react";

import { DataTable } from "@/shared/ui";

import { useGetPendingTrainers } from "@/entities/profile";

import { useColumns } from "../../lib/hooks/useColumns";
import cn from "classnames";

interface PendingTrainersTableProps {
  className?: string;
  gymId: number;
  shiftId?: number;
}

export const PendingTrainersTable: FC<PendingTrainersTableProps> = ({
  className,
  gymId,
  shiftId,
}) => {
  const { data } = useGetPendingTrainers(gymId, {
    currentPage: 1,
    pageSize: 100,
    shiftId,
  });
  const columns = useColumns({ gymId });

  return (
    <DataTable
      className={cn(className)}
      columns={columns}
      data={data?.pendingTrainerModels ?? []}
    />
  );
};
