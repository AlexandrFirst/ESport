import { ReactNode } from "react";
import { Layout, LayoutProps } from "../../ui/Layout/Layout";

export const getMainLayout =
  // eslint-disable-next-line react/display-name
  (props?: Omit<LayoutProps, "children">) => (page: ReactNode) => {
    return <Layout {...props}>{page}</Layout>;
  };
