import BugReportIcon from "@mui/icons-material/BugReport";
import SettingsIcon from "@mui/icons-material/Settings";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import { routes } from "routes";

import { IMenuItem } from "../../types/menu-item";

export const useMenu = () => {
  const menu: IMenuItem[] = [
    { title: "Test", icon: <BugReportIcon className="mr-3" />, link: "/test" },
    {
      title: "Streams",
      icon: <ConnectedTvIcon className="mr-3" />,
      link: routes.Streams,
    },
    {
      title: "Test-main",
      icon: <BugReportIcon className="mr-3" />,
      link: routes.Main,
    },
    {
      title: "Competitions",
      icon: <SportsKabaddiIcon className="mr-3" />,
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
      icon: <SettingsIcon className="mr-3" />,
      link: "/settings",
    },
  ];

  return { menu };
};
