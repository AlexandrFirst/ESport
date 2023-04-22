import React, { FC, memo, ReactNode } from "react";
import styles from "./UILink.module.css";

import Link, { LinkProps } from "next/link";
import cn from "classnames";

interface UILinkProps extends LinkProps {
  className?: string;
  children?: ReactNode;
}

const UILink: FC<UILinkProps> = ({ className, children, ...props }) => {
  return (
    <Link {...props} className={cn(styles.wrapper, className)}>
      {children}
    </Link>
  );
};

export default memo(UILink);
