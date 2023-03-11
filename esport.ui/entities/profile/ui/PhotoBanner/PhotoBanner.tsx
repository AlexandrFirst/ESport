import React, { memo } from "react";
import styles from "./PhotoBanner.module.scss";

import Image from "next/image";

import { SportCard } from "@shared/ui/SportCard/SportCard";

interface PhotoBannerProps {
  src: string;
}

const PhotoBanner: React.FC<PhotoBannerProps> = ({ src }) => {
  return (
    <SportCard className={styles.wrapper}>
      <Image src={src} alt="Banner" className={styles.img} />
    </SportCard>
  );
};

export default memo(PhotoBanner);
