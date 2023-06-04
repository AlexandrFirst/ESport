import React, { FC } from "react";
import styles from "./GymInfoTabs.module.css";

import { useRouter } from "next/router";
import cn from "classnames";

import { TabList, Tabs } from "@/shared/ui";

import { useAuth } from "@/entities/user";
import { useProfileInfo } from "@/entities/profile";
import { IGymReadInfo } from "@/entities/gym";
import { EditableCalendarTimetable } from "@/features/GymCalendars";
import { TrainerRequestsTable } from "@/features/TrainerRequestsTable";

interface GymInfoTabsProps {
  className?: string;
  gym: IGymReadInfo;
}

export const GymInfoTabs: FC<GymInfoTabsProps> = ({ className, gym }) => {
  const router = useRouter();
  const { gymId, organisationId } = router.query;

  const { user } = useAuth();
  const { isAdminForGyms, profileOrganisationId, hasTrainerInfo } =
    useProfileInfo({
      userId: user?.id ?? 0,
      gymIds: [Number(gymId ?? 0)],
    });

  const list: TabList = [
    {
      label: "Timetable",
      content: <EditableCalendarTimetable gym={gym} />,
      value: "timetable",
    },
    {
      label: "Trainer requests",
      content: (
        <TrainerRequestsTable
          gymId={gym.gymId}
          organisationId={Number(organisationId ?? 0)}
        />
      ),
      value: "trainer requests",
      disabled:
        !hasTrainerInfo &&
        !isAdminForGyms &&
        profileOrganisationId !== Number(organisationId),
    },
  ];

  return <Tabs className={cn(styles.wrapper, className)} tabs={list} />;
};
