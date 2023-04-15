import { ToastPositionType } from "@/shared/ui";
import { SnackbarToastProps } from "../../ui/SnackbarToast/SnackbarToast";

export interface SnackbarSchema {
  toasts: SnackbarToastProps[];
  position: ToastPositionType;
}
