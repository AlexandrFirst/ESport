import { FC } from "react";
import styles from "./GymsFilters.module.css";

import cn from "classnames";

import { InputBase, TimeInputBase } from "@/shared/ui";

interface GymsFiltersProps {
  className?: string;
}

export const GymsFilters: FC<GymsFiltersProps> = ({ className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <InputBase label={"Address"} />
      <InputBase label={"Name"} />
      <div className={"flex justify-between items-center"}>
        <TimeInputBase label={"Open hour"} />
        -
        <TimeInputBase label={"Close hour"} />
      </div>
    </div>
  );
};
