import { ColumnDef } from "@tanstack/table-core";

import { formatDate } from "@/shared/lib";
import { Badge, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";

import { useAuth, useCurrentUserProfileInfo } from "@/entities/user";
import { CompetitionOrganisation, ICompetition } from "@/entities/competition";

interface UseCompetitionListColumnsProps {
  orgId: number;
}

export const useCompetitionListColumns = ({
  orgId,
}: UseCompetitionListColumnsProps) => {
  const { userId } = useAuth();
  const { profileOrganisationId } = useCurrentUserProfileInfo();

  const columns: ColumnDef<ICompetition & CompetitionOrganisation>[] = [
    {
      header: "Name",
      cell({ row: { original } }) {
        return (
          <UILink
            href={routes.Competition.CompetitionById([original.id])}
            color="inverted"
          >
            {original.title}
          </UILink>
        );
      },
    },
    {
      header: "Start Date",
      accessorKey: "dateStart",
      cell({ row: { original } }) {
        return formatDate(original.dateStart);
      },
    },
    {
      header: "End Date",
      accessorKey: "dateEnd",
      cell({ row: { original } }) {
        return formatDate(original.dateEnd, "--");
      },
    },
    {
      header: "Registration",
      enableResizing: true,
      cell({ row: { original } }) {
        const date = formatDate(original.registrationCloseDate, "--");
        return original.isRegistrationOpen ? (
          <UILink href={routes.Competition.ApplyToCompetition([original.id])}>
            Opened (until {date})
          </UILink>
        ) : (
          <Badge>Closed ({date})</Badge>
        );
      },
    },
    {
      header: "Address",
      accessorKey: "address",
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
