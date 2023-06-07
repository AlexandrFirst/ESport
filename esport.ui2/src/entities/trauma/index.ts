export { Trauma } from "./ui/Trauma/Trauma";
export type { TraumaSchema } from "./model/types/traumaSchema";

//types
export type { ITrauma } from "./model/types/trauma";

//api
export { TraumaApi } from "./api/TraumaApi";
export { traumaApiKeys } from "./api/hooks/traumaApiKeys";
export { useGetTraumas, getTraumas } from "./api/hooks/useGetTraumas";
