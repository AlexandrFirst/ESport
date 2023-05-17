import React, { FC, memo, ReactNode } from "react";
import styles from "./UILink.module.css";

import Link, { LinkProps } from "next/link";
import cn from "classnames";

type LinkColor = "normal" | "inverted";

interface UILinkProps extends LinkProps {
  className?: string;
  children?: ReactNode;
  color?: LinkColor;
}

const UILink: FC<UILinkProps> = ({
  className,
  color = "normal",
  children,
  ...props
}) => {
  return (
    <Link {...props} className={cn(styles.wrapper, styles[color], className)}>
      {children}
    </Link>
  );
};

export default memo(UILink);
