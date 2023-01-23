import React from "react";
import styles from "./competitionsGrid.module.scss";

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { SportTable } from "@shared/ui/SportTable/SportTable";
import { SportLink } from "@shared/ui/SportLink/SportLink";

import { ICompetition } from "@entities/competition";

interface CompetitionsGridProps {
  competitions: ICompetition[];
}

export const CompetitionsTable: React.FC<CompetitionsGridProps> = ({
  competitions,
}) => {
  const columns: GridColDef<ICompetition>[] = [
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
      renderCell: () => <SportLink to={"#"}>Actions</SportLink>,
    },
  ];

  return (
    <SportTable
      rows={competitions}
      columns={columns}
      pageSize={5}
      className={styles.grid}
      // rowsPerPageOptions={[5]}
      // checkboxSelection
      disableSelectionOnClick
      // experimentalFeatures={{ newEditingApi: true }}
      hideFooter
    />
  );
};
