import { FC, useState } from "react";
import styles from "./PendingAdminsTable.module.css";

import { DataTable, Title } from "@/shared/ui";
import { useColumns } from "../../lib/hooks/useColumns";
import { useMappedRoles } from "@/shared/lib";
import { AdminType, useGetPendingAdmins } from "@/entities/profile";
import { UserRole } from "@/shared/constants";

interface PendingAdminsTableProps {
  className?: string;
  initialState?: AdminType;
  gymId?: number;
}

//TODO: delete dropdown. This should be only for 1 type of admin
export const PendingAdminsTable: FC<PendingAdminsTableProps> = ({
  initialState,
  gymId,
}) => {
  const [adminType, setAdminType] = useState(
    initialState ?? AdminType.OrgAdmin
  );

  const { data } = useGetPendingAdmins({
    page: 1,
    pageSize: 100,
    adminType,
  });

  const columns = useColumns(adminType, gymId);
  const translatedRoles = useMappedRoles();
  return (
    <>
      <Title className={styles.table}>
        Pending admins for type:{" "}
        {translatedRoles[
          adminType === AdminType.OrgAdmin
            ? UserRole.OrganisationAdmin
            : UserRole.GymAdmin
        ].toLowerCase()}
      </Title>
      <DataTable
        columns={columns}
        data={data?.pendingAdminModels ?? []}
        className={styles.table}
      />
    </>
  );
};
