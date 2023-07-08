import { FC } from "react";
import styles from "./ApplyToCompetition.module.css";

import { useRouter } from "next/router";
import { TrashIcon } from "lucide-react";

import { BackLink, Button, Card, Title } from "@/shared/ui";

import { useAuth } from "@/entities/user";
import {
  useCompetitionWithOrganisation,
  useGetCompetitorRecords,
} from "@/entities/competition";

import { ApplyToCompetitionForm } from "@/features/(competition)/ApplyToCompetitionForm";

import { CreatedRequest } from "../CreatedRequest/CreatedRequest";
import { DeleteRequest } from "../DeleteRequest/DeleteRequest";

interface ApplyToCompetitionProps {
  className?: string;
}

export const ApplyToCompetition: FC<ApplyToCompetitionProps> = (props) => {
  const router = useRouter();
  const competitionId = Number(router.query.competitionId);

  const { user } = useAuth();

  const { data } = useCompetitionWithOrganisation({
    competitionId,
  });
  const { data: competitorData } = useGetCompetitorRecords({
    competitionId,
    userId: user?.id ?? 0,
  });

  const lastUserRecord = competitorData?.userCompetitorRecords?.[0];
  const requestInfo = lastUserRecord?.requests?.find(
    (r) => r.competitionId === competitionId
  );

  return (
    <div className={"max-w-4xl mx-auto"}>
      <BackLink onClick={router.back} className={"mb-3"} />
      <Title center className={"mb-4"}>
        Apply to {data?.competition.title}
      </Title>
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
      {requestInfo && <DeleteRequest />}
    </div>
  );
};
