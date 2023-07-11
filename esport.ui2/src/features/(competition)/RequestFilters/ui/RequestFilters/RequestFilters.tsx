import { FC } from "react";
import styles from "./RequestFilters.module.css";
import { Card, InputBase } from "@/shared/ui";

interface RequestFiltersProps {
  className?: string;
}

export const RequestFilters: FC<RequestFiltersProps> = (props) => {
  return (
    //   TODO: develop filters design
    <Card padding={"sm"} className={"flex gap-8 md:flex-col lg:flex-row"}>
      <div className={"flex items-center gap-4"}>
        <InputBase label="Weight" labelActive />
        -
        <InputBase />
      </div>
      <div className={"flex items-center gap-4"}>
        <InputBase label="Age" labelActive />
        -
        <InputBase />
      </div>
    </Card>
  );
};
