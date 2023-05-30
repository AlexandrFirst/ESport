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
import { BeatLoader } from "react-spinners";
import { LoaderColor } from "@/shared/constants";

export const SidebarMenu: FC = () => {
  const router = useRouter();

  const { isSidebarOpened } = useSidebarContext();
  const { isLoading, menu } = useMenu();

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
          {isLoading ? (
            //   TODO: add skeleton
            <div className={"flex justify-center items-center"}>
              <BeatLoader color={LoaderColor} />
            </div>
          ) : (
            menu.map((sMenu) => (
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
            ))
          )}
        </ul>
      </nav>
    </>
  );
};
