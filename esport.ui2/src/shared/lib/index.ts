//store
export { useAppSelector } from "./hooks/store/useAppSelector";
export { useAppDispatch } from "./hooks/store/useAppDispatch";
export { buildSlice } from "./store/buildSlice";
export { buildSelector } from "./store/buildSelector";

//hooks
export { useMedia } from "./hooks/useMedia";
export { useWrapApi } from "./hooks/useWrapApi";
export { useModal } from "./hooks/useModal";
export { useUserDevice } from "./hooks/useUserDevice";

//utils
export { getDeviceDetect } from "./utils/detect-device";
export { addMonths } from "./utils/add-months";

export { createBuildPath } from "./utils/build-path";
export type { Query, Parameter } from "./utils/build-path";
