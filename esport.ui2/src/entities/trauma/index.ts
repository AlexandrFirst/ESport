export { Trauma } from "./ui/Trauma/Trauma";
export type { TraumaSchema } from "./model/types/traumaSchema";

//types
export type { ITrauma } from "./model/types/trauma";
export type { ITraumaHistoryRecord } from "./model/types/trauma-history-record";

//api
export { TraumaApi } from "./api/TraumaApi";
export { traumaApiKeys } from "./api/hooks/traumaApiKeys";
export { useGetTraumas, getTraumas } from "./api/hooks/useGetTraumas";
