import React, { FC, ReactNode } from "react";
import styles from "./Footer.module.css";
import cn from "classnames";

// eslint-disable-next-line features-slice-design-shatori/layer-imports
import { useSelectIsSidebarOpened } from "@/widgets/LeftSidebar";

interface FooterProps {
  className?: string;
  children: ReactNode;
}

export const Footer: FC<FooterProps> = ({ className, children }) => {
  const isSidebarOpened = useSelectIsSidebarOpened();

  return (
    <footer
      className={cn(
        styles.wrapper,
        className,
        isSidebarOpened ? styles.compact : styles.full
      )}
    >
      {children}
    </footer>
  );
};
