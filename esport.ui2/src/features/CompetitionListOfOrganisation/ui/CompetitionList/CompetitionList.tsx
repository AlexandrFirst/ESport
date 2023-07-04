import { FC } from "react";

import { DataTable } from "@/shared/ui";
import { ICompetitionWithOrganisationAndCreator } from "@/entities/competition";

import { useCompetitionListColumns } from "../../lib/hooks/useCompetitionListColumns";

interface CompetitionListProps {
  list: ICompetitionWithOrganisationAndCreator[];
  orgId: number;
}

export const CompetitionList: FC<CompetitionListProps> = ({ list, orgId }) => {
  const columns = useCompetitionListColumns({ orgId });
  return <DataTable data={list} columns={columns} />;
};
