import React, { memo } from "react";
import styles from "./ProfilePhoto.module.scss";

import Image from "next/image";
import cn from "classnames";

interface ProfilePhotoProps {
  src: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
  src,
  size = "md",
  className,
}) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return 24;
      case "md":
        return 48;
      case "lg":
        return 72;
    }
  };

  return (
    <div
      className={cn(styles.wrapper, className, {
        [styles.sm]: size === "sm",
        [styles.md]: size === "md",
        [styles.lg]: size === "lg",
      })}
    >
      <Image
        width={getSize()}
        height={getSize()}
        src={src}
        loader={() => src}
        alt="Profile photo"
        className={styles.img}
      />
    </div>
  );
};

export default memo(ProfilePhoto);
