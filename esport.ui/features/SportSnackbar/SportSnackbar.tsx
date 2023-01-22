import React from "react";
import styles from "./sportSnackbar.module.scss";

import { Alert, Slide, Snackbar } from "@mui/material";

import { MESSAGE_TIME } from "@shared/consts/app";
import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/useStore";

import { clearError } from "@features/SportSnackbar";

export const SportSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { type, message, open } = useAppSelector(({ snackbar }) => snackbar);

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <Snackbar
      TransitionComponent={Slide}
      open={open}
      autoHideDuration={MESSAGE_TIME}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{ width: "100%" }}
        className={styles.alert}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
