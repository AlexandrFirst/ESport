import React, { FC, ReactNode } from "react";
import styles from "./CenteredLayout.module.css";

import Image from "next/image";
import { useRouter } from "next/router";
import cn from "classnames";

import { Button } from "@/shared/ui";
import { routes } from "@/shared/config";

interface ConfirmingLayoutProps {
  className?: string;
  disabledButton?: boolean;
  children: ReactNode;
  isLoading?: boolean;
  loadingFallback?: ReactNode;
  isError?: boolean;
  errorFallback?: ReactNode;
  fadeOutOnFinish?: boolean;
}

export const CenteredLayout: FC<ConfirmingLayoutProps> = ({
  className,
  disabledButton,
  isError,
  errorFallback,
  loadingFallback,
  isLoading,
  fadeOutOnFinish,
  children,
}) => {
  const img = "/images/boy-with-coffee.png";
  const router = useRouter();
  const handleClick = () => {
    router.push(routes.Home());
  };

  let content = children;
  if (isLoading) content = loadingFallback;
  if (isError) content = errorFallback;

  return (
    <main className={styles.wrapper}>
      <div
        className={cn(styles.content, className, {
          "opacity-0 transition-all": fadeOutOnFinish,
        })}
      >
        {content}
      </div>
      <Image
        width={780}
        height={487}
        src={img}
        loader={() => img}
        alt="Boy with coffee"
        // className={styles.img}
      />
      <Button
        disabled={disabledButton || isLoading}
        onClick={handleClick}
        className={styles.btn}
      >
        BACK TO HOME
      </Button>
    </main>
  );
};
