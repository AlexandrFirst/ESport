import { FC, useState } from "react";
import dayjs from "dayjs";

import {
  ISmallCalendarContext,
  SmallCalendarContextProvider,
} from "./SmallCalendarContext";
import { SmallCalendarComponent } from "./SmallCalendarComponent";

interface SmallCalendarProps extends Partial<ISmallCalendarContext> {
  className?: string;
  onPrevClick?: (newMonth: number) => void;
  onNextClick?: (newMonth: number) => void;
  onDayClick?: (day: Date) => void;
}

export const SmallCalendar: FC<SmallCalendarProps> = ({
  currentMonth,
  setCurrentMonth,
  className,
  onNextClick,
  onPrevClick,
  onDayClick,
}) => {
  const [privateCurrentMonth, setPrivateCurrentMonth] = useState(
    dayjs().month()
  );

  return (
    <SmallCalendarContextProvider
      context={{
        currentMonth: currentMonth ?? privateCurrentMonth,
        setCurrentMonth: setCurrentMonth ?? setPrivateCurrentMonth,
      }}
    >
      <SmallCalendarComponent
        className={className}
        onDayClick={onDayClick}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
      />
    </SmallCalendarContextProvider>
  );
};
