import { FC } from "react";
import { useRouter } from "next/router";

import { BoldText, Title } from "@/shared/ui";

import {
  RequestList,
  useCompetitionWithOrganisation,
} from "@/entities/competition";

export const RequestWithFilters: FC = () => {
  const router = useRouter();
  const competitionId = Number(router.query.competitionId);

  const { data } = useCompetitionWithOrganisation({
    competitionId,
    includeRequests: true,
  });

  const requests = data?.competition.requests ?? [];

  return (
    <>
      {/*<RequestFilters />*/}
      {!!requests.length && <BoldText end>Total: {requests?.length}</BoldText>}
      <RequestList
        list={requests ?? []}
        emptyMessage={<BoldText>No requests yet</BoldText>}
      />
    </>
  );
};
