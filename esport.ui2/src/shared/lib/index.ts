//store
import { isSameMonth } from "./dates/isSameMonth";

export { useAppSelector } from "./hooks/store/useAppSelector";
export { useAppDispatch } from "./hooks/store/useAppDispatch";
export { buildSlice } from "./store/buildSlice";
export { buildSelector } from "./store/buildSelector";

//hooks
export { useMedia } from "./hooks/useMedia";
export { useWrapApi } from "./hooks/useWrapApi";
export { useModal } from "./hooks/useModal";
export { useUserDevice } from "./hooks/useUserDevice";
export { useSnackbar } from "./hooks/useSnackbar";
export { useUrlWithReturnUrl } from "./hooks/router/useUrlWithReturnUrl";
export { useMappedRoles } from "./hooks/localization/useMappedRoles";
export { useMappedDaysOfTheWeek } from "./hooks/localization/useMappedDaysOfTheWeek";
export { useDebounce } from "./hooks/useDebounce";
export { useRedirectAfterFetch } from "./hooks/useRedirectAfterFetch";
export { useMappedDaysOfTheWeekByDayIndex } from "./hooks/localization/useMappedDaysOfTheWeekByDayIndex";
export { useThrottle } from "./hooks/useThrottle";
export { useGetLoginUrl } from "./hooks/useGetLoginUrl";
export { useScrollTop } from "./hooks/useScrollTop";

//utils
export { getDeviceDetect } from "./utils/detect-device";
export { redirect } from "./utils/redirect";
export { randomAlphabetString, randomNumberString } from "./utils/randomString";
export { capitalize } from "./utils/capitalize";
export { Logger } from "./utils/Logger";
export { debounce } from "./utils/debounce";
export { getApiError } from "./utils/getApiError";
export { getTimeRangeStr } from "./utils/getTimeRangeStr";
export { uniqueObjectsArray } from "./utils/uniqueObjectsArray";

export { createBuildPath } from "./utils/build-path";
export type { Query, Parameter } from "./utils/build-path";

//ssr
export { getAppServerSideProps } from "./ssr/get-app-serverside-props";
export { checkUserAndRedirect } from "./ssr/check-user-and-redirect";

//router
export { addReturnUrl } from "./router/add-return-url/add-return-url";

//dates
export { getCalendarMonthMatrix } from "./dates/getCalendarMonthMatrix";
export { isToday } from "./dates/isToday";
export { isSameDay } from "./dates/isSameDay";
export { isCurrentMonth } from "./dates/isCurrentMonth";
export { isSameMonth } from "./dates/isSameMonth";
export { getTime } from "./dates/getTime";
export { getTimeFromTimeSpan } from "./dates/getTimeFromTimeSpan";
export { getCurrentMonth } from "./dates/getCurrentMonth";
export { isSameDayOfTheWeek } from "./dates/isSameDayOfTheWeek";
export { getDayOfTheWeekByDayIndex } from "./dates/getDayOfTheWeekByDayIndex";
