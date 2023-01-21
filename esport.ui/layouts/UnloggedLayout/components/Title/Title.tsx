import React, { PropsWithChildren } from "react";
import cn from "classnames";

interface TitleProps extends PropsWithChildren {
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ className, children }) => {
  return <h1 className={cn('text-skin-main text-3xl font-semibold', className)}>{children}</h1>
}
