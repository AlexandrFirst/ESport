import { FC, ReactNode } from "react";
import styles from "./Snackbar.module.css";

import cn from "classnames";

import { positionClasses } from "@/shared/ui";
import { useAppSelector } from "@/shared/lib";

import { selectPosition } from "../../model/selectors/selectPosition/selectPosition";
import { selectToasts } from "../../model/selectors/selectToasts/selectToasts";

import { SnackbarToast } from "../SnackbarToast/SnackbarToast";

interface SnackbarProps {
  className?: string;
  children?: ReactNode;
}

export const Snackbar: FC<SnackbarProps> = ({ className, children }) => {
  const position = useAppSelector(selectPosition);
  const toasts = useAppSelector(selectToasts);

  return (
    <>
      {children}
      <div className={cn(styles.wrapper, positionClasses[position], className)}>
        {toasts?.map((toast) => (
          <SnackbarToast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  );
};
