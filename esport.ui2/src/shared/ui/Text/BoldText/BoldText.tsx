import React, { ElementType, FC, ReactNode } from "react";
import styles from "./BoldText.module.css";
import cn from "classnames";

interface BoldTextProps {
  className?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  center?: boolean;
  end?: boolean;
  as?: ElementType;
}

const BoldText: FC<BoldTextProps> = ({
  className,
  size = "md",
  center,
  end,
  children,
  as,
}) => {
  const Component = as ?? "h5";
  return (
    <Component
      className={cn(
        styles.wrapper,
        styles[size],
        className,
        !center && !end && styles.fit,
        center && styles.center,
        end && styles.end
      )}
    >
      {children}
    </Component>
  );
};

export default BoldText;
