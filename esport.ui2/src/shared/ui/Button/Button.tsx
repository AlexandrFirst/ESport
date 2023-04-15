import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  useEffect,
  useState,
} from "react";
import styles from "./Button.module.css";

import cn from "classnames";
import { motion, useAnimation } from "framer-motion";
import { BeatLoader } from "react-spinners";

export type ButtonVariant = "contained" | "text" | "outlined";

export interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fullWidth?: boolean;
  loading?: boolean;
  variant?: ButtonVariant;
}

export const Button: FC<ButtonProps> = ({
  className,
  loading, //TODO: add loading state
  disabled,
  variant = "contained",
  fullWidth = true,
  children,
  onClick,
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  const textControls = useAnimation();
  const loadingControls = useAnimation();
  const doneControls = useAnimation();

  const animateLoadingStart = async () => {
    setIsAnimating(true);
    textControls.start({
      opacity: 0,
      y: -2,
      transition: { duration: 0.2 },
    });
    await loadingControls.start({
      zIndex: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, delay: 0.2 },
    });
  };

  const animateLoadingEnd = async () => {
    loadingControls.stop();
    textControls.stop();
    textControls.start({
      x: 9,
    });
    await loadingControls.start({
      zIndex: 1,
      y: 4,
      opacity: 0,
      transition: { duration: 0.4, delay: 0.4 },
    });
    await Promise.all([
      doneControls.start({
        zIndex: 1,
        y: 0,
        opacity: 1,
        transition: { duration: 0.22 },
      }),
      textControls.start({
        zIndex: 1,
        y: 0,
        opacity: 1,
        transition: { duration: 0.3 },
      }),
    ]);
    doneControls.start({
      x: -9,
      opacity: 0,
      transition: { duration: 0.2, delay: 0.15 },
    });
    await textControls.start({
      y: 0,
      x: 0,
      transition: { duration: 0.25, delay: 0.15 },
    });
    // doneControls.start({
    //   y: -4,
    //   x: 0,
    //   opacity: 0,
    // });
    setIsAnimating(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (loading && !isAnimating) {
        animateLoadingStart();
      } else {
        animateLoadingEnd();
      }
    }
  }, [loading]);

  return (
    <button
      {...props}
      disabled={disabled || loading || isAnimating}
      onClick={onClick}
      className={cn(styles.btnBase, styles.btn, className, {
        [styles.contained]: variant === "contained",
        [styles.textVariant]: variant === "text",
        [styles.outlined]: variant === "outlined",
        [styles.disabled]: loading || disabled || isAnimating,
        [styles.full_width]: fullWidth,
      })}
    >
      <motion.div className="wrapper">
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={doneControls}
          className={styles.checkmarkWrapper}
        >
          {/*<svg*/}
          {/*  className={styles.text}*/}
          {/*  xmlns="http://www.w3.org/2000/svg"*/}
          {/*  fill="none"*/}
          {/*  viewBox="0 0 24 24"*/}
          {/*  stroke="rgb(255, 2, 102)"*/}
          {/*>*/}
          {/*  <path*/}
          {/*    strokeLinecap="round"*/}
          {/*    strokeLinejoin="round"*/}
          {/*    strokeWidth={2}*/}
          {/*    d="M5 13l4 4L19 7"*/}
          {/*  />*/}
          {/*</svg>*/}
        </motion.div>

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
};
