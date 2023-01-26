import React, { PropsWithChildren } from "react";
import cn from "classnames";

interface RegularItemProps extends PropsWithChildren {
  className?: string;
}

export const RegularItem: React.FC<RegularItemProps> = ({ className, children }) => {
  return <p className={cn('text-skin-subsidiary text-xs', className)}>{children}</p>
}
