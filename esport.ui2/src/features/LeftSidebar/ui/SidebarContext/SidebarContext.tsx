import { createContext, FC, ReactNode, useContext } from "react";

type ISidebarContext = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (p: boolean) => void;
};

const SidebarContext = createContext<ISidebarContext>({
  isSidebarOpened: false,
  setIsSidebarOpened: () => null,
});

type SidebarContextProviderProps = {
  context: ISidebarContext;
  children: ReactNode;
};

export const SidebarContextProvider: FC<SidebarContextProviderProps> = ({
  children,
  context,
}) => {
  return (
    <SidebarContext.Provider value={context}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
