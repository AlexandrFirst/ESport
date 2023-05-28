import React, { FC, memo, MouseEvent, ReactNode } from "react";
import styles from "./UILink.module.css";

import Link, { LinkProps } from "next/link";
import cn from "classnames";
import { useRouter } from "next/router";

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
      className={cn(styles.wrapper, styles[color], className)}
    >
      {children}
    </Link>
  );
};

export default memo(UILink);
