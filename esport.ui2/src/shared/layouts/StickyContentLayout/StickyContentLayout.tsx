import { ReactNode } from "react";
import styles from "./StickyContentLayout.module.css";

import cn from "classnames";

interface StickyContentLayoutProps {
  className?: string;
  left?: ReactNode;
  children: ReactNode;
  right?: ReactNode;
}

export const StickyContentLayout = (props: StickyContentLayoutProps) => {
  const { className, children, left, right } = props;

  return (
    <div className={cn(styles.MainLayout, className)}>
      {left && <div className={styles.left}>{left}</div>}
      <div className={styles.content}>{children}</div>
      {right && <div className={styles.right}>{right}</div>}
    </div>
  );
};
