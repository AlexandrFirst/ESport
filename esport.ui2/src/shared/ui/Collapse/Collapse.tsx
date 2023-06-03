import React, { FC, Key, ReactNode } from "react";
import styles from "./Collapse.module.css";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import cn from "classnames";

interface CollapseItem {
  title?: ReactNode;
  content: ReactNode;
  key: Key;
  defaultOpen?: boolean;
}

export type CollapseList = CollapseItem[];

interface CollapseProps {
  className?: string;
  list: CollapseList;
}

export const Collapse: FC<CollapseProps> = ({ className, list }) => {
  return (
    <>
      {list.map(({ content, key, title, ...item }) => (
        <Disclosure key={key} defaultOpen={item.defaultOpen}>
          {({ open }) => (
            <>
              <Disclosure.Button className={styles.btn}>
                {title}
                <ChevronUpIcon
                  className={cn(styles.icon, { [styles.icon_open]: open })}
                />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className={styles.content}>
                  {content}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};
