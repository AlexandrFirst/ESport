import React, { FC } from "react";
import { DataTable } from "@/shared/ui";
import { useColumns } from "../../lib/hooks/useColumns";
import { ICompetiton } from "@/entities/competition";

interface CompetitionsTableProps {
  className?: string;
  competitions?: ICompetiton[];
}

export const CompetitionsTable: FC<CompetitionsTableProps> = ({
  className,
  competitions,
}) => {
  const columns = useColumns();
  return (
    <DataTable
      columns={columns}
      data={competitions ?? []}
      className={className}
    />
  );
};
