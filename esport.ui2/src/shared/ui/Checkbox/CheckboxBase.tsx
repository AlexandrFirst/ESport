import { ElementRef, forwardRef } from "react";
import styles from "./Checkbox.module.css";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import cn from "classnames";

import { Check } from "lucide-react";
import { ErrorMessage } from "@/shared/types";
import { FormError } from "../FormError/FormError";

export type CheckboxBaseProps = CheckboxProps & {
  label?: string;
  error?: ErrorMessage;
};

export const CheckboxBase = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxBaseProps
>(({ className, label, name, error, ...props }, ref) => {
  return (
    <div className={className}>
      <div className={styles.wrapper}>
        <CheckboxPrimitive.Root
          ref={ref}
          id={name}
          name={name}
          className={cn(
            styles.checkbox,
            styles.disabled,
            styles.focus,
            styles.checked,
            { [styles.error]: !!error }
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
          <label
            htmlFor={name}
            className={cn(styles.label, { [styles.error]: !!error })}
          >
            {label}
          </label>
        )}
      </div>
      <FormError error={error} />
    </div>
  );
});
CheckboxBase.displayName = CheckboxPrimitive.Root.displayName;
