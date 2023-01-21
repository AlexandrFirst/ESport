import React, { PropsWithChildren, ReactNode } from "react";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SportModalProps extends PropsWithChildren {
  open: boolean;
  title?: string;
  actions?: ReactNode;
  onClose?: () => void;
}

export const SportModal: React.FC<SportModalProps> = ({
  title,
  open,
  actions,
  onClose,
  children,
}) => {
  return (
    // <SportPortal>
    <Dialog
      open={open}
      className={"bg-skin-main"}
      // TransitionComponent={Transition}
      onClose={onClose}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
    // </SportPortal>
  );
};
