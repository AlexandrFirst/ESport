import React, { PropsWithChildren } from "react";
import styles from "./dividers.module.css";

import { Divider } from "@mui/material";

interface DividersProps extends PropsWithChildren {}

export const Dividers: React.FC<DividersProps> = ({ children }) => {
  return (
    <>
      <Divider className={styles.divider} />
      {children}
      <Divider className={styles.divider} />
    </>
  );
};
