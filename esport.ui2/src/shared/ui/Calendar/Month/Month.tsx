import React, { FC, Fragment } from "react";
import styles from "./Month.module.css";

import { Dayjs } from "dayjs";

import { MonthDay } from "../MonthDay/MonthDay";

interface MonthProps {
  className?: string;
  month: Dayjs[][];
}

export const Month: FC<MonthProps> = ({ className, month }) => {
  return (
    <div className={styles.wrapper}>
      {month.map((row, i) => (
        <Fragment key={i}>
          {row.map((day, idx) => (
            <MonthDay day={day} key={idx} rowIdx={i} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};
