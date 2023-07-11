import { FC } from "react";
import styles from "./ApplyToCompetition.module.css";

import { useRouter } from "next/router";

import { AnimatePresence, motion } from "framer-motion";

import {
  BackLink,
  Card,
  Collapse,
  CollapseList,
  Dock,
  ErrorText,
  TabList,
  Tabs,
  Title,
} from "@/shared/ui";

import { useAuth } from "@/entities/user";
import {
  useCompetitionWithOrganisation,
  useGetCompetitorRecords,
} from "@/entities/competition";

import { ApplyToCompetitionForm } from "@/features/(competition)/ApplyToCompetitionForm";

import { CreatedRequest } from "../CreatedRequest/CreatedRequest";
import { DeleteRequest } from "../DeleteRequest/DeleteRequest";
import { RequestWithFilters } from "@/_pages/(competition)/ApplyToCompetition/ui/RequestWithFilters/RequestWithFilters";
import { Loader } from "lucide-react";

interface ApplyToCompetitionProps {
  className?: string;
}

export const ApplyToCompetition: FC<ApplyToCompetitionProps> = (props) => {
  const router = useRouter();
  const competitionId = Number(router.query.competitionId);

  const { user, isOrganisationAdmin } = useAuth();

  const {
    data,
    isError,
    error,
    isLoading: isCompetitionLoading,
  } = useCompetitionWithOrganisation({
    competitionId,
    includeRequests: isOrganisationAdmin,
  });
  const { data: competitorData, isLoading: isCompetitorLoading } =
    useGetCompetitorRecords({
      competitionId,
      userId: user?.id ?? 0,
    });

  const lastUserRecord = competitorData?.userCompetitorRecords?.[0];
  const requestInfo = lastUserRecord?.requests?.find(
    (r) => r.competitionId === competitionId
  );

  const tabs: TabList = [
    {
      label: `Apply to ${data?.competition.title}`,
      value: "apply",
      content: (
        <>
          <Card padding={"lg"}>
            {requestInfo ? (
              <CreatedRequest createdRequest={requestInfo} />
            ) : (
              <ApplyToCompetitionForm
                lastRecord={lastUserRecord}
                competitionId={competitionId}
                userId={user?.id ?? 0}
              />
            )}
          </Card>
          {requestInfo && <DeleteRequest requestId={requestInfo.id} />}
        </>
      ),
    },
    ...(isOrganisationAdmin
      ? [
          {
            label: "Requests",
            content: <RequestWithFilters />,
            value: "requests",
          },
        ]
      : []),
  ];

  if (isCompetitionLoading || isCompetitorLoading) {
    return (
      <AnimatePresence>
        <motion.div
          className={"w-full h-[400px] flex items-center justify-center"}
        >
          <Loader className={"animate-spin"} />
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isError) {
    return (
      <>
        <BackLink onClick={router.back} className={"mb-3"} />
        <ErrorText>{error?.message}</ErrorText>
      </>
    );
  }

  return (
    <div className={"max-w-4xl mx-auto"}>
      <BackLink onClick={router.back} className={"mb-3"} />
      <Tabs tabs={tabs} className="mb-14" />
    </div>
  );
};
