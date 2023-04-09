import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StateSchema } from "@/_app/Providers";

export const useAppSelector: TypedUseSelectorHook<StateSchema> = useSelector;
