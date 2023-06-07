import React, { FC } from "react";
import styles from "./FromToTime.module.css";
import { TimeInput } from "@/shared/ui";
import cn from "classnames";

interface FromToTimeProps {
  className?: string;
  nameFrom: string;
  nameTo: string;
}

export const FromToTime: FC<FromToTimeProps> = ({
  nameFrom,
  nameTo,
  className,
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <TimeInput name={nameFrom} label={"From"} />
      -
      <TimeInput name={nameTo} label={"To"} />
    </div>
  );
};
