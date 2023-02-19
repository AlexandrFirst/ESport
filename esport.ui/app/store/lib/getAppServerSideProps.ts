import { wrapper } from "@app/store/store";
import { updateSidebarState } from "@app/store/lib/updateSidebarState";
import { GetServerSideProps } from "next";

export const getAppServerSideProps = <TProps extends { [key: string]: any }>(
  cb: GetServerSideProps<TProps>
) => {
  return wrapper.getServerSideProps<TProps>((store) => async (ctx) => {
    updateSidebarState(store);
    return cb(ctx);
  });
};
