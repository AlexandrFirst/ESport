import { FC } from "react";

import { DataTable } from "@/shared/ui";

import { useColumns } from "../../lib/hooks/useColumns";
import { IGymRequestItem } from "@/entities/gym";
import { DayOfTheWeek } from "@/shared/constants";

interface TrainerRequestsTableProps {
  className?: string;
}

const data: IGymRequestItem[] = [
  {
    dayOfTheWeeks: [DayOfTheWeek.MONDAY, DayOfTheWeek.THURSDAY],
    from: "12:00",
    to: "13:00",
    gymId: 0,
    gymName: "Mango",
    requestDescription: "Need swinming trainer",
    requestId: 0,
    shiftId: 0,
    timeOverrides: [],
  },
];

export const TrainerRequestsTable: FC<TrainerRequestsTableProps> = (props) => {
  const columns = useColumns();
  return <DataTable columns={columns} data={data} />;
};
