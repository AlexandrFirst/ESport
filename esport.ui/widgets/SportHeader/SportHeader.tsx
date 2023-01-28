import React from "react";
import styles from "./sportHeader.module.css";

import cn from "classnames";

import { List } from "@mui/material";

import { useAppSelector } from "@shared/lib/hooks/useStore";

import { selectUser } from "@entities/user";

import { SportThemeSwitcher } from "@features/SportThemeSwitcher/SportThemeSwitcher";
import { Translate } from "@features/Translate/Translate";

import { HeaderListItem } from "./components/ListItem/ListItem";
import { AuthItems } from "./components/AuthItems/AuthItems";
import { AnonItems } from "./components/AnonItems/AnonItems";

interface SportHeaderProps {
  className?: string;
}

export const SportHeader: React.FC<SportHeaderProps> = ({ className }) => {
  const { isAuth } = useAppSelector(selectUser);

  return (
    <header className={cn(styles.header, className)}>
      <nav className={styles.nav}>
        <List className={styles.list}>
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
