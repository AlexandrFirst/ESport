import React from "react";
import styles from "./sportTable.module.scss";

import { DataGrid, DataGridProps } from "@mui/x-data-grid";

import { getRandomId } from "@shared/lib/helpers/get-random-id";
import cn from "classnames";

interface SportTableProps extends DataGridProps {}

export const SportTable: React.FC<SportTableProps> = ({
  rows,
  className,
  ...props
}) => {
  const hasId = rows.every((row) => row.id);
  return (
    <DataGrid
      {...props}
      rows={hasId ? rows : rows.map((item) => ({ id: getRandomId(), ...item }))}
      className={cn(styles.table, className)}
    />
  );
};
