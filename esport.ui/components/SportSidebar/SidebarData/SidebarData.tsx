import React from "react";
import styles from "./sidebarData.module.css";

import { useRouter } from "next/router";

import { List, ListItem } from "@mui/material";

import { IMenuItem } from "@interfaces/menu-item";

import { SportLogo } from "@components/SportLogo/SportLogo";
import { SportScrollable } from "@components/SportScrollable/SportScrollable";

import { CollapsableMenuItem } from "../CollapsableMenuItem/CollapsableMenuItem";
import { SimpleMenuItem } from "../SimpleMenuItem/SimpleMenuItem";
import { useMenu } from "../useMenu";
import { useSidebarContext } from "@components/SportSidebar/SidebarContext/SidebarContext";
import cn from "classnames";

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
          ["w-10/12"]: isSidebarOpened,
          ["w-4/6"]: !isSidebarOpened,
        })}
      >
        <SportScrollable>
          <nav>
            {menu.map((sMenu, index) => (
              <ListItem
                key={sMenu.title}
                className={`flex justify-start flex-col rounded-md p-0 cursor-pointer hover:bg-light-white text-skin-main text-sm transition-all duration-500 items-start
                ${sMenu.gap ? "mt-9" : "mt-2"} ${
                  index === 0 && "bg-light-white"
                } `}
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
