import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  useState,
} from "react";
import styles from "./Button.module.css";

import cn from "classnames";
import { motion, useAnimation } from "framer-motion";
import { BeatLoader } from "react-spinners";

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
      ...props
    },
    ref
  ) {
    const [isAnimating, setIsAnimating] = useState(false);
    // const [mounted, setMounted] = useState(false);

    const textControls = useAnimation();
    const loadingControls = useAnimation();
    const doneControls = useAnimation();

    // const animateLoadingStart = useCallback(async () => {
    //   setIsAnimating(true);
    //   textControls.start({
    //     opacity: 0,
    //     y: -2,
    //     transition: { duration: 0.2 },
    //   });
    //   await loadingControls.start({
    //     zIndex: 1,
    //     y: 0,
    //     opacity: 1,
    //     transition: { duration: 0.3, delay: 0.2 },
    //   });
    // }, [loadingControls, textControls]);
    //
    // const animateLoadingEnd = useCallback(async () => {
    //   loadingControls.stop();
    //   textControls.stop();
    //   textControls.start({
    //     x: 9,
    //   });
    //   await loadingControls.start({
    //     zIndex: 1,
    //     y: 4,
    //     opacity: 0,
    //     transition: { duration: 0.4, delay: 0.4 },
    //   });
    //   await Promise.all([
    //     doneControls.start({
    //       zIndex: 1,
    //       y: 0,
    //       opacity: 1,
    //       transition: { duration: 0.22 },
    //     }),
    //     textControls.start({
    //       zIndex: 1,
    //       y: 0,
    //       opacity: 1,
    //       transition: { duration: 0.3 },
    //     }),
    //   ]);
    //   await doneControls.start({
    //     x: -9,
    //     opacity: 0,
    //     transition: { duration: 0.2, delay: 0.15 },
    //   });
    //   await textControls.start({
    //     y: 0,
    //     x: 0,
    //     transition: { duration: 0.25, delay: 0.15 },
    //   });
    //   // doneControls.start({
    //   //   y: -4,
    //   //   x: 0,
    //   //   opacity: 0,
    //   // });
    //   setIsAnimating(false);
    // }, [doneControls, loadingControls, textControls]);

    // useEffect(() => {
    //   setMounted(true);
    // }, []);

    // useEffect(() => {
    //   if (mounted) {
    //     if (loading && !isAnimating) {
    //       animateLoadingStart();
    //     } else {
    //       animateLoadingEnd();
    //     }
    //   }
    // }, [animateLoadingEnd, animateLoadingStart, isAnimating, loading, mounted]);

    return (
      <button
        {...props}
        ref={ref}
        disabled={disabled || loading || isAnimating}
        onClick={onClick}
        className={cn(
          styles.btnBase,
          styles.btn,
          styles[variant],
          styles[color],
          className,
          {
            [styles.disabled]: loading || disabled || isAnimating,
            [styles.full_width]: fullWidth,
          }
        )}
      >
        <motion.div className="wrapper">
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={doneControls}
            className={styles.checkmarkWrapper}
          />

          <motion.span initial={{ opacity: 1 }} animate={textControls}>
            {children}
          </motion.span>
          <motion.div
            initial={{ opacity: 0 }}
            animate={loadingControls}
            className={styles.loaderWrapper}
          >
            <BeatLoader color={"#FFF"} size={6} />
          </motion.div>
        </motion.div>
      </button>
    );
  }
);
