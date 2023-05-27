import { FC, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

import cn from "classnames";
import { FormError } from "../FormError/FormError";
import { Message } from "../Input/InputBase";

export interface TextAreaBaseProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
  error?: Message;
}

export const TextAreaBase: FC<TextAreaBaseProps> = ({
  className,
  fullWidth = true,
  error,
  ...props
}) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <textarea
        {...props}
        className={cn(styles.text_area, {
          [styles.full_width]: fullWidth,
          [styles.error]: !!error,
        })}
      />
      <FormError error={error} />
    </div>
  );
};
