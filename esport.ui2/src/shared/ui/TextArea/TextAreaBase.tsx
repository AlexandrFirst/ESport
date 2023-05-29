import { FC, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

import cn from "classnames";

import { ErrorMessage } from "@/shared/types";

import { FormError } from "../FormError/FormError";

export interface TextAreaBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
  error?: ErrorMessage;
}

export const TextAreaBase: FC<TextAreaBaseProps> = ({
  className,
  fullWidth = true,
  error,
  disabled,
  ...props
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <textarea
        {...props}
        disabled={disabled}
        className={cn(styles.text_area, {
          [styles.full_width]: fullWidth,
          [styles.error]: !!error,
          [styles.disabled]: disabled,
        })}
      />
      <FormError error={error} />
    </div>
  );
};
