import React, {
  DetailedHTMLProps,
  FC,
  ReactNode,
  useState,
  VideoHTMLAttributes,
} from "react";
import styles from "./AppVideo.module.css";

import { ErrorText } from "..";
import cn from "classnames";

interface AppVideoProps
  extends DetailedHTMLProps<
    VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  errorFallback?: ReactNode;
}

export const AppVideo: FC<AppVideoProps> = ({
  errorFallback,
  src,
  width = 490,
  height = 400,
  className,
  ...props
}) => {
  const [isError, setIsError] = useState(false);

  const handleError = () => setIsError(true);

  if (isError) {
    return (
      <>{errorFallback ?? <ErrorText>Error while loading video</ErrorText>}</>
    );
  }

  return (
    <video
      {...props}
      className={cn(styles.wrapper, className)}
      src={src}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};
