import React, { FC } from "react";
import styles from "./ProfilePhoto.module.css";

import Image from "next/image";

export interface ProfilePhotoProps {
  src: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const ProfilePhoto: FC<ProfilePhotoProps> = ({
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
    <Image
      width={getSize()}
      height={getSize()}
      src={src}
      loader={() => src}
      alt="Profile photo"
      className={styles.img}
    />
  );
};
