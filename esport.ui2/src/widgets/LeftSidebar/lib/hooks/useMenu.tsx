import {
  BeakerIcon,
  BriefcaseIcon,
  CogIcon,
  ComputerDesktopIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

import { routes } from "@/shared/config";

import { useAuth } from "@/entities/user";

import { IMenuItem } from "../../types/menu-item";
import MenuIcon from "../../ui/MenuIcon/MenuIcon";

export const useMenu = (): IMenuItem[] => {
  const { user, isAuth, isAdmin } = useAuth();

  return [
    {
      title: "Test",
      icon: <MenuIcon Svg={BeakerIcon} />,
      link: routes.Main,
    },
    {
      title: "Streams",
      icon: <MenuIcon Svg={ComputerDesktopIcon} />,
      link: routes.Streams,
    },
    ...(isAuth
      ? [
          {
            title: "Profile",
            icon: <MenuIcon Svg={UserCircleIcon} />,
            link: routes.User.Profile.Main,
          },
        ]
      : []),
    ...(isAuth
      ? [
          {
            title: "Competitions",
            icon: <MenuIcon Svg={BriefcaseIcon} />,
            gap: true,
            link: routes.Competition.Main,
            items: [
              {
                title: "Competitions",
                // icon: <SportsKabaddiIcon className="mr-3" />,
                link: routes.Competition.Main,
              },
              {
                title: "Create",
                // icon: <AddIcon className="mr-3" />,
                link: routes.Competition.Create,
              },
            ],
          },
        ]
      : []),
    ...(isAuth
      ? [
          {
            title: "Settings",
            icon: <MenuIcon Svg={CogIcon} />,
            link: "/settings",
          },
        ]
      : []),
  ];
};
