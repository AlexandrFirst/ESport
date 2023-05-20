import React, { ElementType, ReactNode, useState } from "react";
import styles from "./Tabs.module.css";

import cn from "classnames";
import { motion } from "framer-motion";

export interface TabItem<T extends number> {
  children: ReactNode;
  value: T;
  as?: ElementType;
  className?: string;
}

export type TabList<T extends number> = TabItem<T>[];

interface TabsProps<T extends number> {
  currentTab: T;
  tabs: TabItem<T>[];
  className?: string;
  as?: ElementType;
  onTabChange?: (tab: T) => void;
}

export function Tabs<T extends number>({
  tabs,
  currentTab,
  className,
  onTabChange,
  as: Component = "ul",
}: TabsProps<T>) {
  const [tab, setTab] = useState(currentTab);

  const handleTabClick = (tab: T) => () => {
    setTab(tab);
    onTabChange?.(tab);
  };

  return (
    <Component className={cn(styles.wrapper, className)}>
      {tabs.map(({ children, value, as: TabComponent = "li", className }) => (
        <TabComponent
          key={value}
          className={cn(styles.tab, className, {
            [styles.activeTab]: value === tab,
          })}
          onClick={handleTabClick(value)}
        >
          {value === tab && (
            <motion.div
              layoutId="active-pill"
              className={styles.pill}
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <div className={cn(styles.label)}>{children}</div>
        </TabComponent>
      ))}
    </Component>
  );
}
