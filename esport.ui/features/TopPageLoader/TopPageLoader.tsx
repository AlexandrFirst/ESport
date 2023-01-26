import React from "react";
import styles from "./topPageLoader.module.css";

import { LinearProgress } from "@mui/material";

import { useAppSelector } from "../../shared/lib/hooks/useStore";
import { selectLoadingIndicator } from "./topPageLoader.slice";

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
