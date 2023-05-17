import React, { FC } from "react";
import styles from "./BottomNav.module.css";

import { Footer } from "../Footer/Footer";
import { Button } from "..";

interface BottomNavProps {
  className?: string;
}

export const BottomNav: FC<BottomNavProps> = ({ className }) => {
  return (
    <Footer className={styles.wrapper}>
      <Button fullWidth={false} variant={"outlined"} color={"error"}>
        Cancel
      </Button>
      <Button fullWidth={false}>Save</Button>
    </Footer>
  );
};
