import { StateSchema } from "@/_app/Providers";
import { buildSelector } from "@/shared/lib";

export const [useSelectIsAuth, selectIsAuth] = buildSelector(
  (state: StateSchema) => !!state.user?.data
);
