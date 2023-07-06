import { useCallback } from "react";
import { ColumnDef } from "@tanstack/table-core";
import { useQueryClient } from "@tanstack/react-query";

import {
  getApiError,
  getTimeFromTimeSpan,
  useMappedDaysOfTheWeek,
  useSnackbar,
} from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";
import { Badge, Button } from "@/shared/ui";

import { GymApi, gymApiKeys, IGymRequestItem } from "@/entities/gym";

interface UseColumnsProps {
  disabledAction?: boolean;
}

export const useColumns = (
  props?: UseColumnsProps
): ColumnDef<IGymRequestItem>[] => {
  const { disabledAction } = props || {};
  const mappedDays = useMappedDaysOfTheWeek({ listAllTranslations: true });
  const { showError, showSuccess } = useSnackbar();
  const queryClient = useQueryClient();

  const handleApply = useCallback(
    (requestId: number) => async () => {
      try {
        await GymApi().applyForTrainerRequest({
          trainerRequestId: requestId,
        });
        showSuccess("Successfully applied for trainer request");
      } catch (e: any) {
        showError(getApiError(e));
      } finally {
        await queryClient.invalidateQueries({
          queryKey: gymApiKeys.getTrainerRequestsAll(),
        });
      }
    },
    [queryClient, showError, showSuccess]
  );

  return [
    {
      accessorKey: "gymName",
      header: "Gym",
    },
    {
      accessorKey: "requestDescription",
      header: "Description",
    },
    {
      accessorKey: "dayOfTheWeeks",
      header: "Days",
      cell: ({ row: { getValue } }) => {
        const days: DayOfTheWeek[] = getValue("dayOfTheWeeks");
        return `${days.map((day) => mappedDays[day]).join(", ")}`;
      },
    },
    {
      accessorKey: "from",
      header: "Time",
      cell: ({ row: { original } }) =>
        `${getTimeFromTimeSpan(original.from)} - ${getTimeFromTimeSpan(
          original.to
        )}`,
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row: { original } }) => (
        <div className="flex justify-center">
          {!original.isApplied ? (
            <Button
              onClick={handleApply(original.requestId)}
              variant={"text"}
              disabled={disabledAction}
            >
              Apply
            </Button>
          ) : (
            <Badge variant={"outlined"}>Applied</Badge>
          )}
        </div>
      ),
    },
  ];
};
