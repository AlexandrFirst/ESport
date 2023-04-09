import React, { memo, ReactNode, useMemo } from "react";
import styles from "./ProfilePagesSwitcher.module.scss";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import { routes } from "routes";
import { SportLink } from "@shared/ui/SportLink/SportLink";
import { useRouter } from "next/router";
import cn from "classnames";

type ProfilePageSwitch = {
  [key in keyof Partial<typeof routes.User.Profile>]: {
    title: string;
    path: string;
    icon?: ReactNode;
  };
};

const ProfilePagesSwitcher: React.FC = () => {
  const { asPath } = useRouter();

  const profilePages: ProfilePageSwitch = useMemo(
    () => ({
      Main: {
        title: "Profile",
        path: routes.User.Profile.Main,
        icon: <AccountBoxIcon />,
      },
      Competitions: {
        title: "Competitions",
        path: routes.User.Profile.Competitions,
        icon: <SportsKabaddiIcon />,
      },
    }),
    []
  );

  return (
    <ul className={styles.wrapper}>
      {Object.values(profilePages).map(({ title, path, icon }) => (
        <li key={path} className={styles.list_item}>
          <SportLink
            to={path}
            className={cn(styles.link, {
              [styles.link_active]: asPath === path,
            })}
          >
            {icon} <span className={styles.link_text}>{title}</span>
          </SportLink>
        </li>
      ))}
    </ul>
  );
};

export default memo(ProfilePagesSwitcher);
