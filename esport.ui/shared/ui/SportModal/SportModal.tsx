import React, { PropsWithChildren, ReactNode } from "react";
import styles from "./sportModal.module.scss";

import cn from "classnames";

import { Dialog, DialogActions, DialogContent, Fade } from "@mui/material";
import { SportCard } from "@shared/ui/SportCard/SportCard";
import { TransitionProps } from "@mui/material/transitions";

interface SportModalProps extends PropsWithChildren {
  open: boolean;
  title?: string;
  actions?: ReactNode;
  onClose?: () => void;
  className?: string;
  maxWidth?: "xl" | "md" | "sm" | "xs" | "lg" | false;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Fade unmountOnExit ref={ref} {...props} />;
});

export const SportModal: React.FC<SportModalProps> = ({
  title,
  open,
  actions,
  onClose,
  className,
  maxWidth,
  children,
}) => {
  return (
    // <SportPortal>
    <Dialog
      open={open}
      className={cn(className)}
      TransitionComponent={Transition}
      onClose={onClose}
      PaperComponent={(props) => <SportCard {...props} />}
      maxWidth={maxWidth}
    >
      <h2 className={styles.title}>{title}</h2>
      {/*<DialogTitle>{title}</DialogTitle>*/}
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
    // </SportPortal>
  );
};
