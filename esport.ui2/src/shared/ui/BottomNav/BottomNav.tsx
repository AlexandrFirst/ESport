import React, { FC } from "react";
import styles from "./BottomNav.module.css";

import { Footer } from "../Footer/Footer";
import { Button, ButtonColor } from "..";
import cn from "classnames";

interface BottomNavProps {
  className?: string;
  withCancel?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  loading?: boolean;
  saveText?: string;
  cancelText?: string;
  cancelDisabled?: boolean;
  saveDisabled?: boolean;
  cancelColor?: ButtonColor;
}

export const BottomNav: FC<BottomNavProps> = ({
  className,
  onSave,
  onCancel,
  withCancel,
  loading,
  saveText = "Save",
  cancelText = "Cancel",
  saveDisabled,
  cancelDisabled,
  cancelColor = "error",
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
          color={cancelColor}
          onClick={onCancel}
          disabled={cancelDisabled}
        >
          {cancelText}
        </Button>
      )}
      <Button
        fullWidth={false}
        onClick={onSave}
        loading={loading}
        disabled={saveDisabled}
      >
        {saveText}
      </Button>
    </Footer>
  );
};
