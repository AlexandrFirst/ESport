import { FC, ReactNode } from "react";
import cn from "classnames";

interface FlexContainerProps {
  children: ReactNode;
  className?: string;
}

export const FlexContainer: FC<FlexContainerProps> = ({
  className,
  children,
}) => {
  return (
    <div className={cn("flex gap-2 items-center", className)}>{children}</div>
  );
};
