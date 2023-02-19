export type AppServerConfig<TParams = any, TProps = any> = {
  showInitialError?: boolean;
  onReject?: (...params: TParams[]) => { props: TProps };
};
