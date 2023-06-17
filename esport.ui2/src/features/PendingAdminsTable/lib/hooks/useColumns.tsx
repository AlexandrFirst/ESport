import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/table-core";

import { Button } from "@/shared/ui";
import { getApiError, useSnackbar } from "@/shared/lib";

import {
  AdminType,
  IPendingAdminModel,
  ProfileApi,
  profileApiKeys,
} from "@/entities/profile";

export const useColumns = (
  adminType: AdminType,
  gymId?: number
): ColumnDef<IPendingAdminModel>[] => {
  const queryClient = useQueryClient();

  const { showError, showSuccess } = useSnackbar();
  const handleApprove = (userId: number) => async () => {
    if (adminType === AdminType.OrgAdmin) {
      try {
        const api = await ProfileApi();
        await api.confirmOrgAdmin({ userId });
        await queryClient.invalidateQueries({
          queryKey: profileApiKeys.getPendingAdminsAll(),
        });
        showSuccess("Successfully confirmed organisation admin");
      } catch (e) {
        showError(getApiError(e));
      }
    } else if (adminType === AdminType.GymAdmin) {
      try {
        if (gymId) {
          const api = await ProfileApi();
          await api.confirmGymAdmin(gymId, { userId });
          await queryClient.invalidateQueries({
            queryKey: profileApiKeys.getPendingAdminsAll(),
          });
          showSuccess("Successfully confirmed gym admin");
        }
      } catch (e) {
        showError(getApiError(e));
      }
    }
  };

  return [
    {
      accessorKey: "username",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Email",
    },
    {
      accessorKey: "actions",
      header: "",
      cell: ({ row: { original } }) => (
        <Button variant={"text"} onClick={handleApprove(original.userId)}>
          Approve
        </Button>
      ),
    },
  ];
};
