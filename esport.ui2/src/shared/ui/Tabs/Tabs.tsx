import React, { ElementType, Fragment, ReactNode } from "react";
import styles from "./Tabs.module.css";

import cn from "classnames";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";

export interface TabItem<T extends string> {
  label: ReactNode;
  value: T;
  content: ReactNode;
  as?: ElementType;
  className?: string;
  disabled?: boolean;
}

export type TabList<T extends string = string> = TabItem<T>[];

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  className?: string;
  as?: ElementType;
  onTabChange?: (tab: T) => void;
  selectedIndex?: number;
  setSelectedIndex?: (index: number) => void;
}

export function Tabs<T extends string>({
  tabs,
  className,
  onTabChange,
  as: Component = "ul",
  selectedIndex,
  setSelectedIndex,
}: TabsProps<T>) {
  const handleTabClick = (tab: T) => () => {
    onTabChange?.(tab);
  };

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List>
        <Component className={cn(styles.wrapper, className)}>
          {tabs.map(
            ({
              label,
              value,
              as: TabComponent = "li",
              className,
              disabled,
            }) => (
              <Tab key={value} disabled={disabled}>
                {({ selected }) => (
                  <TabComponent
                    className={cn(styles.tab, className, {
                      [styles.activeTab]: selected,
                      [styles.disabled]: disabled,
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
                    <div
                      className={cn(styles.label, {
                        [styles.selected_text]: selected,
                      })}
                    >
                      {label}
                    </div>
                  </TabComponent>
                )}
              </Tab>
            )
          )}
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
