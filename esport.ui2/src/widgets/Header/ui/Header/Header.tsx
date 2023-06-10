import React, { FC, useState } from "react";
import styles from "./Header.module.css";

import cn from "classnames";
import { Menu } from "lucide-react";

import { useAuth } from "@/entities/user";

import { ThemeSwitcher } from "@/features/ThemeSwitcher";
import { Translate } from "@/features/Translate";

import AnonItems from "../AnonItems/AnonItems";
import { ListItem } from "../ListItem/ListItem";
import { AuthItems } from "../AuthItems/AuthItems";
import { IconButton, Logo } from "@/shared/ui";
import { SidebarDrawer } from "@/widgets/LeftSidebar";
import { useUserDevice } from "@/shared/lib";

interface HeaderProps {
  className?: string;
  withLogoAndMenu?: boolean;
}

export const Header: FC<HeaderProps> = ({ className, withLogoAndMenu }) => {
  const { isAuth } = useAuth();
  const { isMobile } = useUserDevice();
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const handleLeftSidebarOpen = () => setIsDrawerOpened(true);

  return (
    <header
      className={cn(styles.header, className, {
        [styles.with_logo]: withLogoAndMenu,
      })}
    >
      {(isMobile || withLogoAndMenu) && (
        <SidebarDrawer open={isDrawerOpened} setOpen={setIsDrawerOpened} />
      )}
      {(isMobile || withLogoAndMenu) && (
        <div className={"flex"}>
          <IconButton
            Svg={Menu}
            fill={false}
            iconSize={"m"}
            onClick={handleLeftSidebarOpen}
          />
          <Logo showText />
        </div>
      )}
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
