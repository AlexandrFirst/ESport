import React, { FC, Fragment, ReactNode } from "react";
import { Transition } from "@headlessui/react";

interface AutocompleteTransitionProps {
  children: ReactNode;
}

export const AutocompleteTransition: FC<AutocompleteTransitionProps> = ({
  children,
}) => {
  return (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {children}
    </Transition>
  );
};
