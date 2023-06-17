import { ColumnDef } from "@tanstack/table-core";
import { useQueryClient } from "@tanstack/react-query";

import { getApiError, getTimeFromTimeSpan, useSnackbar } from "@/shared/lib";
import { Button } from "@/shared/ui";

import { IPendingTrainerModel } from "@/entities/trainer";
import { ProfileApi, profileApiKeys } from "@/entities/profile";

interface UseColumnsProps {
  gymId: number;
}

export const useColumns = ({
  gymId,
}: UseColumnsProps): ColumnDef<IPendingTrainerModel>[] => {
  const { showError, showSuccess } = useSnackbar();
  const queryClient = useQueryClient();

  const handleApproveTrainer =
    (trainerId: number, requestId: number) => async () => {
      try {
        const api = await ProfileApi();
        await api.approvePendingTrainer(gymId, {
          trainerId,
          requestId,
        });
        await queryClient.invalidateQueries({
          queryKey: profileApiKeys.getPendingTrainersAll(),
        });
        showSuccess("Trainer approved successfully");
      } catch (e) {
        showError(getApiError(e));
      }
    };

  return [
    {
      accessorKey: "trainerInfo.name",
      header: "Name",
    },
    {
      accessorKey: "trainerInfo.email",
      header: "Email",
    },
    {
      header: "Sport",
      cell: ({ row: { original } }) => {
        return original.trainerInfo.trainerSportInfos
          .map((sport) => sport.name)
          .join(", ");
      },
    },
    {
      header: "Time",
      cell: ({ row: { original } }) => {
        const { scheduleInfo } = original;
        return `${getTimeFromTimeSpan(
          scheduleInfo.from
        )} - ${getTimeFromTimeSpan(scheduleInfo.to)}`;
      },
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row: { original } }) => {
        return (
          <Button
            variant={"text"}
            onClick={handleApproveTrainer(
              original.trainerInfo.id,
              original.requestId
            )}
          >
            Approve
          </Button>
        );
      },
    },
  ];
};
