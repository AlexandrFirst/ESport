export { getAppStaticProps } from "./lib/getAppStaticProps";
export { getAppServerSideProps } from "./lib/getAppServerSideProps";
export { getAppInitialProps } from "./lib/getAppInitialProps";

export { wrapper } from "./store";

export type { AppDispatch, AppThunk } from "./store";

export { updateSidebarState } from "./helpers/updateSidebarState";
export { updateSnackError } from "./helpers/updateSnackError";
export { getAppServerSideTranslations } from "./helpers/getAppServerSideTranslations";

export type { AppPageProps } from "./types/app-page-props";
export type { TranslationsCtx } from "./types/translate-context";
export type { AppServerConfig } from "./types/app-server-config";
