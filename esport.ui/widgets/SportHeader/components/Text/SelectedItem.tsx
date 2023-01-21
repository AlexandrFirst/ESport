import React, { PropsWithChildren } from "react";
import cn from "classnames";

interface SelectedItemProps extends PropsWithChildren {
  className?: string;
}

export const SelectedItem: React.FC<SelectedItemProps> = ({ className, children }) => {
  return <p className={cn('text-skin-main text-sm font-medium', className)}>{children}</p>
}
