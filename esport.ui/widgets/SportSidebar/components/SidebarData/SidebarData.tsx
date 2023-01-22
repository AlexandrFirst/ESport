import React from "react";
import styles from "./sidebarData.module.scss";

import cn from "classnames";
import { useRouter } from "next/router";

import { List, ListItem } from "@mui/material";

import { SportLogo } from "@shared/ui/SportLogo/SportLogo";
import { SportScrollable } from "@shared/ui/SportScrollable/SportScrollable";

import { IMenuItem } from "@widgets/SportSidebar/types/menu-item";
import { useMenu } from "@widgets/SportSidebar/lib/hooks/useMenu";

import { CollapsableMenuItem } from "../CollapsableMenuItem/CollapsableMenuItem";
import { SimpleMenuItem } from "../SimpleMenuItem/SimpleMenuItem";
import { useSidebarContext } from "../SidebarContext/SidebarContext";

interface SidebarDataProps {}

export const SidebarData: React.FC<SidebarDataProps> = () => {
  const { menu } = useMenu();
  const { pathname, push } = useRouter();

  const { isSidebarOpened } = useSidebarContext();

  const handleClick = ({ link }: IMenuItem) => {
    push(link ?? "");
  };

  return (
    <>
      <SportLogo className={styles.logo} showText={isSidebarOpened} />
      <List
        className={cn(styles.list, {
          [styles.opened]: isSidebarOpened,
          [styles.closed]: !isSidebarOpened,
        })}
      >
        <SportScrollable>
          <nav>
            {menu.map((sMenu) => (
              <ListItem
                key={sMenu.title}
                className={cn(styles.list_item, {
                  [styles.gap]: sMenu.gap,
                })}
              >
                {sMenu.items ? (
                  <CollapsableMenuItem
                    item={sMenu}
                    onSubItemClick={handleClick}
                    currentPathname={pathname}
                  />
                ) : (
                  <SimpleMenuItem
                    item={sMenu}
                    onItemClick={handleClick}
                    currentPathname={pathname}
                  />
                )}
              </ListItem>
            ))}
          </nav>
        </SportScrollable>
      </List>
    </>
  );
};
