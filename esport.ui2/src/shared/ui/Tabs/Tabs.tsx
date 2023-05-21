import React, { ElementType, Fragment, ReactNode } from "react";
import styles from "./Tabs.module.css";

import cn from "classnames";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";

export interface TabItem<T extends number> {
  label: ReactNode;
  value: T;
  content: ReactNode;
  as?: ElementType;
  className?: string;
}

export type TabList<T extends number> = TabItem<T>[];

interface TabsProps<T extends number> {
  tabs: TabItem<T>[];
  className?: string;
  as?: ElementType;
  onTabChange?: (tab: T) => void;
}

export function Tabs<T extends number>({
  tabs,
  className,
  onTabChange,
  as: Component = "ul",
}: TabsProps<T>) {
  const handleTabClick = (tab: T) => () => {
    onTabChange?.(tab);
  };

  return (
    <Tab.Group>
      <Tab.List>
        <Component className={cn(styles.wrapper, className)}>
          {tabs.map(({ label, value, as: TabComponent = "li", className }) => (
            <Tab key={value} as={Fragment}>
              {({ selected }) => (
                <TabComponent
                  className={cn(styles.tab, className, {
                    [styles.activeTab]: selected,
                  })}
                  onClick={handleTabClick(value)}
                >
                  {selected && (
                    <motion.div
                      layoutId="active-pill"
                      className={styles.pill}
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <div className={cn(styles.label)}>{label}</div>
                </TabComponent>
              )}
            </Tab>
          ))}
        </Component>
      </Tab.List>
      <Tab.Panels>
        {tabs.map(({ value, content }) => (
          <Tab.Panel as={Fragment} key={value}>
            {content}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
