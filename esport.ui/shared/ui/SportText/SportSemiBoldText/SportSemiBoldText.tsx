import React, { FC, ReactNode } from "react";
import styles from "./SportSemiBoldText.module.scss";
import cn from "classnames";

interface SportSemiBoldTextProps {
  className?: string;
  children: ReactNode;
}

const SportSemiBoldText: FC<SportSemiBoldTextProps> = ({
  className,
  children,
}) => {
  return <h5 className={cn(styles.wrapper, className)}>{children}</h5>;
};

export default SportSemiBoldText;
