import { createContext, FC, ReactNode, useContext } from "react";

export interface ISmallCalendarContext {
  currentMonth: number;
  setCurrentMonth: (newMonth: number) => void;
}

const SmallCalendarContext = createContext<ISmallCalendarContext>({
  currentMonth: 0,
  setCurrentMonth: () => {},
});

interface SmallCalendarContextProps {
  context: ISmallCalendarContext;
  children: ReactNode;
}

export const SmallCalendarContextProvider: FC<SmallCalendarContextProps> = ({
  context,
  children,
}) => {
  return (
    <SmallCalendarContext.Provider value={context}>
      {children}
    </SmallCalendarContext.Provider>
  );
};

export const useSmallCalendarContext = () => useContext(SmallCalendarContext);
