import React, { FC } from "react";
import styles from "./Header.module.css";

import cn from "classnames";

import { useAuth } from "@/entities/user";

import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Translate } from "@/features/Translate";

import AnonItems from "../AnonItems/AnonItems";
import { ListItem } from "../ListItem/ListItem";
import { AuthItems } from "../AuthItems/AuthItems";

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  const { isAuth } = useAuth();
  return (
    <header className={cn(styles.header, className)}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <ListItem>
            <Translate />
          </ListItem>

          <ListItem>
            <ThemeSwitcher />
          </ListItem>

          {isAuth ? <AuthItems /> : <AnonItems />}
        </ul>
      </nav>
    </header>
  );
};
