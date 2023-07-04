import { ColumnDef } from "@tanstack/table-core";
import { ICompetitionWithOrganisationAndCreator } from "@/entities/competition";
import { useAuth, useCurrentUserProfileInfo } from "@/entities/user";
import { useRouter } from "next/router";
import { Button } from "@/shared/ui";

interface UseCompetitionListColumnsProps {
  orgId: number;
}

export const useCompetitionListColumns = ({
  orgId,
}: UseCompetitionListColumnsProps) => {
  const { userId } = useAuth();
  const { profileOrganisationId, isConfirmedOrgAdmin } =
    useCurrentUserProfileInfo();

  const columns: ColumnDef<ICompetitionWithOrganisationAndCreator>[] = [
    {
      header: "Name",
      accessorKey: "title",
    },
    {
      header: "Start Date",
      accessorKey: "dateStart",
      cell({ row: { original } }) {
        //TODO: add date format
        return original.dateStart;
      },
    },
    {
      header: "End Date",
      accessorKey: "dateEnd",
    },
    {
      header: "Registration",
      accessorKey: "isRegistrationOpen",
      cell({ row: { original } }) {
        return original.isRegistrationOpen ? "Open" : "Closed";
      },
    },
    {
      header: " ",
      cell({ row: { original } }) {
        return original.creator.id === userId ? (
          <div className="flex justify-end">
            <Button
              className="text-blue-500 hover:text-blue-700"
              onClick={() => console.log(original)}
            >
              Edit
            </Button>
          </div>
        ) : (
          <></>
        );
      },
    },
  ];

  if (profileOrganisationId === orgId) {
    columns.push({
      header: "Created by",
      accessorKey: "creator.name",
    });
  }

  return columns;
};
