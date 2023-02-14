import { ButtonHTMLAttributes, FC, useEffect, useState } from "react";
import styles from "./rippleButton.module.css";

import { AnimatePresence, motion } from "framer-motion";

interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const RippleButton: FC<RippleButtonProps> = ({ children, onClick }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      timerId = setTimeout(() => setIsRippling(false), 300);
    } else {
      setIsRippling(false);
    }
    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  return (
    <button
      className={styles.ripple_button}
      onClick={(e: any) => {
        const rect = e.target.getBoundingClientRect();
        setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        onClick && onClick(e);
      }}
    >
      <AnimatePresence>
        {isRippling ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.ripple}
            style={{
              left: coords.x,
              top: coords.y,
            }}
          />
        ) : (
          ""
        )}
      </AnimatePresence>
      <span className={styles.content}>{children}</span>
    </button>
  );
};
