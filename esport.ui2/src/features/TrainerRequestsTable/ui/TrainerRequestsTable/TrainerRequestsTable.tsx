import { FC } from "react";

import { DataTable } from "@/shared/ui";

import { useColumns } from "../../lib/hooks/useColumns";
import { useGetGymTrainerRequests } from "@/entities/gym";
import { useAuth } from "@/entities/user";
import { useProfileInfo } from "@/entities/profile";

interface TrainerRequestsTableProps {
  className?: string;
  gymId?: number;
  organisationId?: number;
}

export const TrainerRequestsTable: FC<TrainerRequestsTableProps> = ({
  gymId,
  organisationId,
}) => {
  const { data } = useGetGymTrainerRequests({
    gymId,
    organisationId,
    page: 1,
    pageSize: 100,
  });

  const { user } = useAuth();
  const { hasTrainerInfo } = useProfileInfo({
    userId: user?.id ?? 0,
    gymIds: [gymId ?? 0],
  });

  const columns = useColumns({ disabledAction: !hasTrainerInfo });
  return <DataTable columns={columns} data={data?.gymRequestItems ?? []} />;
};
