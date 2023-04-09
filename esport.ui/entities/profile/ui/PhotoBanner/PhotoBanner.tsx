import React, { memo } from "react";
import styles from "./PhotoBanner.module.scss";

import Image from "next/image";

interface PhotoBannerProps {
  src: string;
}

const PhotoBanner: React.FC<PhotoBannerProps> = ({ src }) => {
  return (
    <div className={styles.wrapper}>
      <Image
        width={4500}
        height={250}
        src={src}
        loader={() => src}
        alt="Banner"
        className={styles.img}
      />
    </div>
  );
};

export default memo(PhotoBanner);
