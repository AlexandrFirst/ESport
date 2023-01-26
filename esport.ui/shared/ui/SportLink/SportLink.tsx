import React, { MouseEvent } from "react";
import styles from "./sportLink.module.css";

import Link from "next/link";

import cn from "classnames";
import { ButtonBase, Link as MUILink, LinkProps } from "@mui/material";

interface SportLinkProps extends LinkProps {
  to: string;
  className?: string;
  disabled?: boolean;
  likeText?: boolean;
}

export const SportLink: React.FC<SportLinkProps> = ({
  className,
  likeText,
  to,
  disabled,
  onClick,
  children,
  ...props
}) => {
  const handleClickLink = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!disabled && onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <Link href={!disabled ? to : ""}>
      <ButtonBase className="rounded-md">
        <MUILink
          {...props}
          className={cn(styles.link, className, {
            [styles.disabled]: disabled,
            [styles.like_text]: likeText,
          })}
          href={to}
          onClick={handleClickLink}
          component={"span"}
        >
          {children}
          {/* {getIcon(WpLinkIconsEnum.download)} */}
        </MUILink>
      </ButtonBase>
    </Link>
  );
};
