import React from "react";
import styles from "./competitionsGrid.module.scss";

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { ICompetition } from "@entities/competition";

import { SportTable } from "@shared/ui/SportTable/SportTable";
import { SportLink } from "@shared/ui/SportLink/SportLink";
import { SportSearch } from "@widgets/SportSearch/SportSearch";
import { SportCard } from "@shared/ui/SportCard/SportCard";

const mocked_competitions: ICompetition[] = [
  {
    _id: "1",
    title: "title",
    dateStart: new Date().toISOString(),
    dateEnd: new Date().toISOString(),
    organizationId: 1,
    categories: [],
  },
];

interface CompetitionsGridProps {
  competitions: ICompetition[];
}

export const CompetitionsGrid: React.FC<CompetitionsGridProps> = ({
  competitions,
}) => {
  const columns: GridColDef<ICompetition>[] = [
    {
      field: "title",
      headerName: "Competition title",
      width: 150,
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
        row.categories.length,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "",
      headerName: "",
      width: 100,
      renderCell: () => <SportLink to={"#"}>Actions</SportLink>,
    },
  ];

  return (
    <SportCard>
      <SportSearch className={styles.search} />
      <SportTable
        rows={mocked_competitions}
        columns={columns}
        pageSize={5}
        className={styles.grid}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        disableSelectionOnClick
        // experimentalFeatures={{ newEditingApi: true }}
        hideFooter
      />
    </SportCard>
  );
};
