import { createContext, FC, PropsWithChildren, useContext } from "react";

type ISidebarContext = {
  isSidebarOpened: boolean;
  setIsSidebarOpened: (p: boolean) => void;
};

const SidebarContext = createContext<ISidebarContext>({
  isSidebarOpened: false,
  setIsSidebarOpened: () => null,
});

type ISidebarContextProviderProps = ISidebarContext & PropsWithChildren;

export const SidebarContextProvider: FC<ISidebarContextProviderProps> = ({
  children,
  ...context
}) => {
  return (
    <SidebarContext.Provider value={context}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
