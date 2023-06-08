import React, { FC, memo, MouseEvent, ReactNode } from "react";
import styles from "./UILink.module.css";

import Link, { LinkProps } from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

type LinkColor = "normal" | "inverted";
type LinkSize = "base" | "xl";

interface UILinkProps extends LinkProps {
  className?: string;
  children?: ReactNode;
  color?: LinkColor;
  size?: LinkSize;
}

const UILink: FC<UILinkProps> = ({
  className,
  color = "normal",
  size = "base",
  children,
  onClick,
  ...props
}) => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick ? onClick(e) : router.push(props.href as string);
  };

  return (
    <Link
      {...props}
      onClick={handleClick}
      className={cn(styles.wrapper, styles[color], styles[size], className)}
    >
      {children}
    </Link>
  );
};

export default memo(UILink);
