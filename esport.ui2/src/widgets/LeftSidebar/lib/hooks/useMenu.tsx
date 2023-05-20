import {
  BeakerIcon,
  BriefcaseIcon,
  CogIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

import { routes } from "@/shared/config";

import { useAuth } from "@/entities/user";

import { IMenuItem } from "../../types/menu-item";
import MenuIcon from "../../ui/MenuIcon/MenuIcon";

export const useMenu = (): IMenuItem[] => {
  const { user, isAuth } = useAuth();

  return [
    {
      title: "Test",
      icon: <MenuIcon Svg={BeakerIcon} />,
      link: routes.Home(),
    },
    {
      title: "Streams",
      icon: <MenuIcon Svg={ComputerDesktopIcon} />,
      link: routes.Streams(),
    },
    ...(isAuth
      ? [
          {
            title: "Competitions",
            icon: <MenuIcon Svg={BriefcaseIcon} />,
            gap: true,
            link: routes.Competition.Home(),
            items: [
              {
                title: "Competitions",
                // icon: <SportsKabaddiIcon className="mr-3" />,
                link: routes.Competition.Home(),
              },
              {
                title: "Create",
                // icon: <AddIcon className="mr-3" />,
                link: routes.Competition.Create(),
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
            link: routes.Settings(),
          },
        ]
      : []),
  ];
};
