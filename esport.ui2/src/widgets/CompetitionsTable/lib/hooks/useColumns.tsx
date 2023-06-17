import { ColumnDef } from "@tanstack/table-core";
import { UILink } from "@/shared/ui";
import { ICompetiton } from "@/entities/competition";
import { routes } from "@/shared/config";

export const useColumns = (): ColumnDef<ICompetiton>[] => {
  return [
    {
      accessorKey: "title",
      header: "Competition name",
    },
    {
      accessorKey: "dateStart",
      header: "Start date",
    },
    {
      accessorKey: "dateEnd",
      header: "End date",
    },
    {
      accessorKey: "action",
      header: "",
      cell: ({ row }) => {
        return (
          <UILink href={routes.Competition.CompetitionById([row.original._id])}>
            Open
          </UILink>
        );
      },
    },
  ];
};
