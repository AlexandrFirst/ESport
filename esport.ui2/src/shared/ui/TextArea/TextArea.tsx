import { FC, TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

import cn from "classnames";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  fullWidth?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({
  className,
  fullWidth = true,
  ...props
}) => {
  return (
    <textarea
      {...props}
      className={cn(styles.wrapper, className, {
        [styles.full_width]: fullWidth,
      })}
    />
  );
};
