import React, { FC, memo } from "react";
import styles from "./Header.module.css";

import cn from "classnames";
import { Translate } from "@/features/Translate";

import { ListItem } from "../ListItem/ListItem";

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn(styles.header, className)}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <ListItem>
            <Translate />
          </ListItem>

          {/*<ListItem>*/}
          {/*  <SportThemeSwitcher />*/}
          {/*</ListItem>*/}

          {/*{isAuth ? <AuthItems /> : <AnonItems />}*/}
        </ul>
      </nav>
    </header>
  );
};
