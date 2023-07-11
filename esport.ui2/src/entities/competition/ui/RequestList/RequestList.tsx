import { FC, Fragment, ReactNode } from "react";
import cn from "classnames";

import { CompetitionRequest } from "../../model/types/competition-request";

import { RequestItem } from "./RequestItem";

interface RequestListProps {
  list: CompetitionRequest[];
  title?: ReactNode;
  className?: string;
  emptyMessage?: ReactNode;
}

export const RequestList: FC<RequestListProps> = ({
  list,
  title,
  className,
  emptyMessage,
}) => {
  return (
    <>
      {title}
      <ul className={cn("flex flex-wrap gap-7 mt-3", className)}>
        {!!list.length
          ? list.map((request, index) => (
              <Fragment key={request.id}>
                <RequestItem request={request} index={index} />
              </Fragment>
            ))
          : emptyMessage}
      </ul>
    </>
  );
};
