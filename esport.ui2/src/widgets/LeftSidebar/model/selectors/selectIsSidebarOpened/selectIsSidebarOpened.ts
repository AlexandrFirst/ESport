import { buildSelector } from "@/shared/lib";

export const [useSelectIsSidebarOpened, selectIsSidebarOpened] = buildSelector(
  ({ leftSidebar }) => leftSidebar.isSidebarOpened
);
