import { useDispatch } from "react-redux";
import { AppDispatch } from "@/_app/Providers";

export const useAppDispatch = () => useDispatch<AppDispatch>();
