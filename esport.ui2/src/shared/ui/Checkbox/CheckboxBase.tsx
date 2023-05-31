import { ElementRef, forwardRef } from "react";
import styles from "./Checkbox.module.css";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import cn from "classnames";

import { Check } from "lucide-react";

export type CheckboxBaseProps = CheckboxProps & {
  label?: string;
};

export const CheckboxBase = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxBaseProps
>(({ className, label, id, ...props }, ref) => (
  <div className={cn(styles.wrapper, className)}>
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      className={cn(
        styles.checkbox,
        styles.disabled,
        styles.focus,
        styles.checked
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    )}
  </div>
));
CheckboxBase.displayName = CheckboxPrimitive.Root.displayName;
