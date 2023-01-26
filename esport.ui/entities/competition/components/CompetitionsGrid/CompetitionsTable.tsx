import React, { useMemo } from "react";
import styles from "./competitionsGrid.module.css";

import cn from "classnames";

import {
  DataGridProps,
  GridColDef,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { routes } from "routes";

import { SportTable } from "@shared/ui/SportTable/SportTable";
import { SportLink } from "@shared/ui/SportLink/SportLink";

import { ICompetition } from "@entities/competition";

interface CompetitionsTableProps
  extends Omit<DataGridProps, "rows" | "columns"> {
  competitions: ICompetition[];
}

export const CompetitionsTable: React.FC<CompetitionsTableProps> = ({
  competitions,
  hideFooter = true,
  disableSelectionOnClick = true,
  className,
  ...props
}) => {
  const columns: GridColDef<ICompetition>[] = useMemo(
    () => [
      {
        field: "title",
        headerName: "Competition title",
        width: 250,
        editable: false,
      },
      {
        field: "dateStart",
        headerName: "Start date",
        width: 250,
        editable: false,
      },
      {
        field: "dateEnd",
        headerName: "End date",
        description: "End date of competition",
        width: 250,
        editable: false,
      },
      {
        field: "categories",
        headerName: "Categories count",
        sortable: false,
        width: 160,
        valueGetter: ({ row }: GridValueGetterParams<any, ICompetition>) =>
          row.categories?.length ?? 0,
      },
      {
        field: "",
        headerName: "",
        width: 100,
        renderCell: ({ row }) => (
          <SportLink to={routes.Competition.Id(row._id ?? "")}>Go to</SportLink>
        ),
      },
    ],
    [competitions]
  );

  return (
    <SportTable
      {...props}
      rows={competitions}
      columns={columns}
      className={cn(styles.grid, className)}
      disableSelectionOnClick={disableSelectionOnClick}
      hideFooter={hideFooter}
    />
  );
};
