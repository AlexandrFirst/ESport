import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ElementType,
  forwardRef,
  useEffect,
  useState,
} from "react";
import styles from "./Button.module.css";

import cn from "classnames";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "contained" | "text" | "outlined";
type ButtonColor = "normal" | "success" | "error" | "theme-main";

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "color"
  > {
  fullWidth?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
  color?: ButtonColor;
  as?: ElementType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      loading,
      disabled,
      variant = "contained",
      fullWidth = false,
      children,
      onClick,
      color = "normal",
      as: Component = "button",
      ...props
    },
    ref
  ) {
    const [isLoadingEneded, setIsLoadingEnded] = useState(true);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (!loading) {
        timer = setTimeout(() => {
          if (!loading) setIsLoadingEnded(true);
        }, 125);
      } else {
        setIsLoadingEnded(false);
      }
      return () => clearTimeout(timer);
    }, [loading]);

    return (
      <Component
        {...props}
        ref={ref}
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(
          styles.btnBase,
          styles.btn,
          styles[variant],
          styles[color],
          className,
          {
            [styles.disabled]: loading || disabled,
            [styles.full_width]: fullWidth,
          }
        )}
      >
        <span className={"flex items-center justify-center transition-all"}>
          <Loader2
            className={cn("mr-2 animate-spin transition-all", {
              "h-4 w-4 opacity-1 inline": loading,
              "h-0 w-0 opacity-0": !loading,
              absolute: isLoadingEneded,
            })}
          />
          {children}
        </span>
      </Component>
    );
  }
);
