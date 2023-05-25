import React, { FC, ReactNode, useContext } from "react";
import { IPublicCalendarContext } from "@/shared/types/calendar";

export interface IPrivateCalendarContext extends IPublicCalendarContext {
  currentMonth: number;
  setCurrentMonth: (num: number) => void;
}

const Context = React.createContext<IPrivateCalendarContext>({
  onSelectDate: () => {},
  events: [],
  currentMonth: 0,
  setCurrentMonth: () => {},
});

interface CalendarContextProps extends IPrivateCalendarContext {
  children: ReactNode;
}

export const CalendarContext: FC<CalendarContextProps> = ({
  children,
  ...context
}) => {
  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useCalendarContext = () => useContext(Context);
