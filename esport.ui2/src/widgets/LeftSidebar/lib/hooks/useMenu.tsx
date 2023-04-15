import {
  BeakerIcon,
  ComputerDesktopIcon,
  UserCircleIcon,
  BriefcaseIcon,
  CogIcon,
} from "@heroicons/react/24/solid";

import { routes } from "@/shared/config";
import { Icon } from "@/shared/ui";

import { IMenuItem } from "../../types/menu-item";

export const useMenu = (): IMenuItem[] => {
  return [
    {
      title: "Test",
      icon: <Icon Svg={BeakerIcon} className={"mr-3"} iconSize={"m"} />,
      link: routes.Main,
    },
    {
      title: "Streams",
      icon: (
        <Icon Svg={ComputerDesktopIcon} className={"mr-3"} iconSize={"m"} />
      ),
      link: routes.Streams,
    },
    {
      title: "Profile",
      icon: <Icon Svg={UserCircleIcon} className={"mr-3"} iconSize={"m"} />,
      link: routes.User.Profile.Main,
    },
    {
      title: "Competitions",
      icon: <Icon Svg={BriefcaseIcon} className={"mr-3"} iconSize={"m"} />,
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
    {
      title: "Settings",
      icon: <Icon Svg={CogIcon} className={"mr-3"} iconSize={"m"} />,
      link: "/settings",
    },
  ];
};
