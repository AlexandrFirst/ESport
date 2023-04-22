import React, { FC } from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

import cn from "classnames";

export enum AvatarSize {
  Small = "sm",
  Medium = "md",
  Large = "lg",
}

export interface AvatarProps {
  className?: string;
  size?: AvatarSize;
  text?: string;
  src?: string;
  alt?: string;
  readOnly?: boolean;
  onClick?: () => void;
}

export const Avatar: FC<AvatarProps> = ({
  className,
  size = "md",
  text,
  readOnly = true,
  onClick,
  alt,
  // src = "https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/demo-4/images/avatars/1.png",
  src,
}) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return 40;
      case "md":
        return 56;
      case "lg":
        return 64;
    }
  };

  return (
    <div
      className={cn(styles.wrapper, styles[size], className, {
        [styles.readOnly]: readOnly,
      })}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          loader={() => src}
          width={getSize()}
          height={getSize()}
        />
      ) : (
        text
      )}
    </div>
  );
};
