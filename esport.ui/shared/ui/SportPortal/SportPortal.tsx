import React, { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface SportPortalProps extends PropsWithChildren {
  element?: HTMLElement;
}

export const SportPortal: React.FC<SportPortalProps> = ({
  element = document.body,
  children,
}) => {
  return createPortal(children, element);
};
