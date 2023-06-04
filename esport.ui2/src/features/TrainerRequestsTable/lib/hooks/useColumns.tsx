import { ColumnDef } from "@tanstack/table-core";

import { getTimeFromTimeSpan, useMappedDaysOfTheWeek } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";
import { Button } from "@/shared/ui";

import { IGymRequestItem } from "@/entities/gym";

interface UseColumnsProps {
  disabledAction?: boolean;
}

export const useColumns = (
  props?: UseColumnsProps
): ColumnDef<IGymRequestItem>[] => {
  const { disabledAction } = props || {};
  const mappedDays = useMappedDaysOfTheWeek({ listAllTranslations: true });

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
          <Button variant={"text"} disabled={disabledAction}>
            Apply
          </Button>
        </div>
      ),
    },
  ];
};
