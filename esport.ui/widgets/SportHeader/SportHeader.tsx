import React from "react";
import cn from "classnames";

import { List } from "@mui/material";

import { selectUser } from "../../entities/user/model/user.slice";
import { useAppSelector } from "../../shared/lib/hooks/useStore";

import { SportThemeSwitcher } from "@features/SportThemeSwitcher/SportThemeSwitcher";

import { HeaderListItem } from "./components/ListItem/ListItem";

import { Translate } from "@features/Translate/Translate";
import { AuthItems } from "./components/AuthItems/AuthItems";
import { AnonItems } from "./components/AnonItems/AnonItems";

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
