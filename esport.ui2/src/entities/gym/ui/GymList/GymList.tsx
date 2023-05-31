import React, { FC } from "react";
import styles from "./GymList.module.css";

import { IGymReadInfo } from "../../model/types/gym-read-info";

import { GymListItem, GymListItemProps } from "./GymListItem";
import { Card, Title, UILink } from "@/shared/ui";
import { routes } from "@/shared/config";

interface GymListProps extends Omit<GymListItemProps, "gym"> {
  className?: string;
  gyms: IGymReadInfo[];
  organisationId: number;
}

export const GymList: FC<GymListProps> = ({
  className,
  gyms,
  organisationId,
  ...props
}) => {
  if (!gyms.length) {
    return (
      <Card className={"text-center"}>
        <Title center className={"mb-4"}>
          Seems like you haven't create Gyms
        </Title>
        <UILink href={routes.Organisation.EditOrganisation([organisationId])}>
          Let's create the first gym in your organisation!
        </UILink>
      </Card>
    );
  }

  return (
    <ul className={styles.wrapper}>
      {gyms.map((gym) => (
        <GymListItem {...props} key={gym.gymId} gym={gym} />
      ))}
    </ul>
  );
};
