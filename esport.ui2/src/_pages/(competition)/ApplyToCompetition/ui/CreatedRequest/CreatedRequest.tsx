import { FC } from "react";

import { Badge, Button, RegularText, SubTitle, Title } from "@/shared/ui";
import { formatDate } from "@/shared/lib";

import { CompetitionRequest } from "@/entities/competition";

interface CreatedRequestProps {
  createdRequest: CompetitionRequest;
}

export const CreatedRequest: FC<CreatedRequestProps> = ({ createdRequest }) => {
  return (
    <>
      <Title className={"mt-5"} size={"small"} center>
        Ooops! You have created request to this competition already
      </Title>
      <SubTitle className={"mt-10 mb-4 flex items-center gap-3"}>
        Your request status is{" "}
        {createdRequest.isAccepted ? (
          <Badge>Approved</Badge>
        ) : (
          <Badge variant={"destructive"}>Not approved</Badge>
        )}
      </SubTitle>
      <div className={"flex justify-end"}>
        <RegularText>
          Request created: {formatDate(createdRequest.createdAt)}
        </RegularText>
      </div>
    </>
  );
};
