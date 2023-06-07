export { BodyPart } from "./ui/BodyPart/BodyPart";
export type { BodyPartSchema } from "./model/types/bodyPartSchema";

//types
export type { IBodyPart } from "./model/types/bodyPart";

//api
export { BodyPartApi } from "./api/BodyPartApi";
export { bodyPartApiKeys } from "./api/hooks/bodyPartApiKeys";
export { useGetBodyParts, getBodyParts } from "./api/hooks/useGetBodyParts";
