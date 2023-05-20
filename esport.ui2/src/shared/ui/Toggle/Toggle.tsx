import React, { FC } from "react";
import styles from "./Toggle.module.css";

import { Switch } from "@headlessui/react";
import cn from "classnames";

interface ToggleProps {
  className?: string;
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  bold?: boolean;
  label?: string;
}

export const Toggle: FC<ToggleProps> = ({
  className,
  enabled,
  setEnabled,
  label,
  bold,
}) => {
  return (
    <Switch.Group>
      <div className={cn(styles.wrapper, className)}>
        {label && (
          <Switch.Label className={cn(styles.label, { [styles.bold]: bold })}>
            {label}
          </Switch.Label>
        )}
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={cn(
            styles.switch,
            enabled ? styles.enabled : styles.disabled
          )}
        >
          <span
            className={cn(
              styles.inner,
              enabled ? styles.inner_enabled : styles.inner_disabled
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};
