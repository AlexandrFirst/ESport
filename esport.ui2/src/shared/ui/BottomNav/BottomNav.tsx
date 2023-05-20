import React, { FC } from "react";
import styles from "./BottomNav.module.css";

import { Footer } from "../Footer/Footer";
import { Button } from "..";
import cn from "classnames";

interface BottomNavProps {
  className?: string;
  withCancel?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  loading?: boolean;
}

export const BottomNav: FC<BottomNavProps> = ({
  className,
  onSave,
  onCancel,
  withCancel,
  loading,
}) => {
  return (
    <Footer
      className={cn(styles.wrapper, className, {
        [styles.withCancel]: withCancel,
        [styles.noCancel]: !withCancel,
      })}
    >
      {withCancel && (
        <Button
          fullWidth={false}
          variant={"outlined"}
          color={"error"}
          onClick={onCancel}
        >
          Cancel
        </Button>
      )}
      <Button fullWidth={false} onClick={onSave} loading={loading}>
        Save
      </Button>
    </Footer>
  );
};
