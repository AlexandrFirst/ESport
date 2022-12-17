import React from "react";
import cn from "classnames";

import { List } from "@mui/material";

import { selectUser } from "@storage/slices/user";
import { useAppSelector } from "@storage/hooks/useStore";

import { SportThemeSwitcher } from "@features/SportThemeSwitcher/SportThemeSwitcher";

import { HeaderListItem } from "./ListItem/ListItem";

import { Translate } from "./Translate/Translate";
import { AuthItems } from "./AuthItems/AuthItems";
import { AnonItems } from "./AnonItems/AnonItems";

interface SportHeaderProps {
  className?: string;
}

export const SportHeader: React.FC<SportHeaderProps> = ({ className }) => {
  const { isAuth } = useAppSelector(selectUser);

  return (
    <header className={cn("bg-skin-main fixed h-[64px]", className)}>
      <nav className="float-right">
        <List className="flex">
          <HeaderListItem>
            <Translate />
          </HeaderListItem>

          <HeaderListItem>
            <SportThemeSwitcher />
          </HeaderListItem>

          {isAuth ? <AuthItems /> : <AnonItems />}
        </List>
      </nav>
    </header>
  );
};
