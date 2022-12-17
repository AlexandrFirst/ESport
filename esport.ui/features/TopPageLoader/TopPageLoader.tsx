import React from "react";
import styles from "./topPageLoader.module.css";

import { LinearProgress } from "@mui/material";

import { useAppSelector } from "@storage/hooks/useStore";
import { selectLoadingIndicator } from "@storage/slices/loadingIndicator";

export const TopPageLoader: React.FC = () => {
  const { isLoading } = useAppSelector(selectLoadingIndicator);
  return (
    <>
      {isLoading && (
        <LinearProgress className={styles.loader} color="inherit" />
      )}
    </>
  );
};
