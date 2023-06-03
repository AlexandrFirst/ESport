import React, { FC, ReactNode } from "react";

import { Collapse, CollapseList, Title } from "@/shared/ui";

import { IGymReadInfo } from "../../model/types/gym-read-info";

import { GymReadInfo } from "../GymReadInfo/GymReadInfo";
import cn from "classnames";

interface CollapsableGymReadInfoProps {
  className?: string;
  gym: IGymReadInfo;
  rightTop?: ReactNode;
}

export const CollapsableGymReadInfo: FC<CollapsableGymReadInfoProps> = ({
  className,
  gym,
  rightTop,
}) => {
  const list: CollapseList = [
    {
      title: <Title>Gym details</Title>,
      content: <GymReadInfo gym={gym} />,
      key: gym.gymId,
      defaultOpen: true,
    },
  ];
  return (
    <div className={cn("relative", className)}>
      <Collapse list={list} />
      <div className={"absolute right-10 top-0"}>{rightTop}</div>
    </div>
  );
};
