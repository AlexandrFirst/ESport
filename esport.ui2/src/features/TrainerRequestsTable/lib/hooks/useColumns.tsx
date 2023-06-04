import { ColumnDef } from "@tanstack/table-core";

import { IGymRequestItem } from "@/entities/gym";
import { getTimeFromTimeSpan, useMappedDaysOfTheWeek } from "@/shared/lib";
import { DayOfTheWeek } from "@/shared/constants";
import { Button } from "@/shared/ui";

export const useColumns = (): ColumnDef<IGymRequestItem>[] => {
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
          <Button variant={"text"}>Apply</Button>
        </div>
      ),
    },
  ];
};
