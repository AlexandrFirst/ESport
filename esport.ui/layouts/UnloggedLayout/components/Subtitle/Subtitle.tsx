import React, { PropsWithChildren } from "react";
import cn from "classnames";

interface SubtitleProps extends PropsWithChildren {
  className?: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({ className, children }) => {
  return <h2 className={cn('text-skin-main text-sm font-medium', className)}>{children}</h2>
}
