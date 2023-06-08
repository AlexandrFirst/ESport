import React, { FC } from "react";
import styles from "./GymItemField.module.css";

import { TrashIcon } from "lucide-react";
import { IconButton, Input, TimeInput } from "@/shared/ui";

import { UseFieldArrayRemove } from "react-hook-form";

interface OrganisationGymListProps {
  index: number;
  remove: UseFieldArrayRemove;
}

export const GymItemField: FC<OrganisationGymListProps> = ({
  index,
  remove,
}) => {
  const handleRemoveClick = () => remove(index);

  return (
    <div className={styles.wrapper}>
      <div className={"flex gap-3 items-center"}>
        <Input name={`gymList.${index}.name`} label={"Title"} fullWidth />
        <Input name={`gymList.${index}.address`} label={"Address"} fullWidth />
        <div className={"flex gap-3 items-center"}>
          <TimeInput name={`gymList.${index}.openTime`} label={"Opens at"} />
          -
          <TimeInput name={`gymList.${index}.closeTime`} label={"Closes at"} />
        </div>
        <IconButton
          Svg={TrashIcon}
          color={""}
          iconSize={"l"}
          svgClassName={styles.trash}
          onClick={handleRemoveClick}
        />
      </div>
    </div>
  );
};
