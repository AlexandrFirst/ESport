import React, { FC } from "react";
import styles from "./SidebarMenu.module.css";

import cn from "classnames";
import { useRouter } from "next/router";
import { Logo } from "@/shared/ui";

import { useMenu } from "../../lib/hooks/useMenu";
import { IMenuItem } from "../../types/menu-item";

import { useSidebarContext } from "../SidebarContext/SidebarContext";
import { SimpleMenuItem } from "../SimpleMenuItem/SimpleMenuItem";
import { CollapsableMenuItem } from "../CollapsableMenuItem/CollapsableMenuItem";

export const SidebarMenu: FC = () => {
  const router = useRouter();

  const { isSidebarOpened } = useSidebarContext();
  const menu = useMenu();

  const handleClick = ({ link }: IMenuItem) => {
    router.push(link ?? "");
  };

  return (
    <>
      <Logo className={styles.logo} showText={isSidebarOpened} />
      <nav
        className={cn(styles.nav, {
          [styles.opened]: isSidebarOpened,
          [styles.closed]: !isSidebarOpened,
        })}
      >
        <ul>
          {/*<SportScrollable>*/}
          {menu.map((sMenu) => (
            <li
              key={sMenu.title}
              className={cn(styles.list_item, {
                [styles.gap]: sMenu.gap,
              })}
            >
              {sMenu.items ? (
                <CollapsableMenuItem
                  item={sMenu}
                  onSubItemClick={handleClick}
                  currentPathname={router.pathname}
                />
              ) : (
                <SimpleMenuItem
                  item={sMenu}
                  onItemClick={handleClick}
                  currentPathname={router.pathname}
                />
              )}
            </li>
          ))}
          {/*</SportScrollable>*/}
        </ul>
      </nav>
      {/*<div className={styles.role_changer_wrapper}>*/}
      {/*  <RoleChanger className={styles.role_changer} />*/}
      {/*</div>*/}
    </>
  );
};
