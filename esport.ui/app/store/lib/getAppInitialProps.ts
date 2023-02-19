import { NextPageContext } from "next";

import { wrapper } from "@app/store/store";
import { updateSidebarState } from "@app/store";

export const getAppInitialProps = (
  cb: (context: NextPageContext<any>) => {} | Promise<{}>
) => {
  return wrapper.getInitialPageProps((store) => async (ctx) => {
    updateSidebarState(store);
    return cb(ctx);
  });
};
