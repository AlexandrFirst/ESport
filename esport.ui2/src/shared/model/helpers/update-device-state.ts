import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { CombinedState } from "redux";

import { StateSchema } from "@/_app/Providers";
import { getDeviceDetect } from "@/shared/lib";

import { deviceActions } from "../slices/deviceSlice";

export const updateDeviceState = (
  store: ToolkitStore<CombinedState<StateSchema>>,
  userAgent: NavigatorID["userAgent"]
) => {
  const { dispatch } = store;
  const { isDesktop, isMobile, isSSR, isIos, isAndroid } =
    getDeviceDetect(userAgent);
  dispatch(
    deviceActions.setDevice({
      isAndroid: isAndroid(),
      isDesktop: isDesktop(),
      isIos: isIos(),
      isMobile: isMobile(),
      isSSR: isSSR(),
    })
  );
};
