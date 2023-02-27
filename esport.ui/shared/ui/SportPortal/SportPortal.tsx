import React, { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface SportPortalProps extends PropsWithChildren {
  element?: HTMLElement;
}

export const SportPortal: FC<SportPortalProps> = ({
  element = document.body,
  children,
}) => {
  return createPortal(children, element);
};
