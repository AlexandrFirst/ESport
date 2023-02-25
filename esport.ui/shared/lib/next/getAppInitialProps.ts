import { NextPageContext } from "next";

import { wrapper } from "@app/Providers";

export const getAppInitialProps = (
  cb: (context: NextPageContext<any>) => {} | Promise<{}>
) => {
  return wrapper.getInitialPageProps((store) => async (ctx) => {
    // updateSidebarState(store);
    return cb(ctx);
  });
};
