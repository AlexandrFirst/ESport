import React from "react";
import { useRouter } from "next/router";

import { List, ListItem } from "@mui/material";

import { IMenuItem } from "@interfaces/menu-item";

import { SportLogo } from "@components/SportLogo/SportLogo";
import { SportScrollable } from "@components/SportScrollable/SportScrollable";

import { CollapsableMenuItem } from "../CollapsableMenuItem/CollapsableMenuItem";
import { SimpleMenuItem } from "../SimpleMenuItem/SimpleMenuItem";
import { useMenu } from "../useMenu";

interface SidebarDataProps {
  isSidebarOpened: boolean;
}

export const SidebarData: React.FC<SidebarDataProps> = ({
  isSidebarOpened,
}) => {
  const { menu } = useMenu();
  const { pathname, push } = useRouter();

  const handleClick = ({ link }: IMenuItem) => {
    push(link ?? "");
  };

  return (
    <>
      <SportLogo
        className={`cursor-pointer duration-500 mr-5`}
        showText={isSidebarOpened}
      />
      <List
        className={`absolute top-20 ${isSidebarOpened ? "w-10/12" : "w-4/6"}`}
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
                    isSidebarOpened={isSidebarOpened}
                    onSubItemClick={handleClick}
                    currentPathname={pathname}
                  />
                ) : (
                  <SimpleMenuItem
                    item={sMenu}
                    isSidebarOpened={isSidebarOpened}
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
