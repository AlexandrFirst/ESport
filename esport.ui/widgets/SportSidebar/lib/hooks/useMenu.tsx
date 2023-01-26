import AdbIcon from "@mui/icons-material/Adb";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";

import { IMenuItem } from "../../types/menu-item";

export const useMenu = () => {
  const menu: IMenuItem[] = [
    { title: "Test", icon: <AdbIcon className="mr-3" />, link: "/test" },
    {
      title: "Calculator",
      icon: <AccountBoxIcon className="mr-3" />,
      link: "/calculator",
    },
    {
      title: "Competitions",
      icon: <AdbIcon className="mr-3" />,
      gap: true,
      items: [
        {
          title: "Index",
          icon: <AccountBoxIcon className="mr-3" />,
          link: "/competition",
        },
        {
          title: "Create",
          icon: <AdbIcon className="mr-3" />,
          link: "/competition/create",
        },
        {
          title: "Settings",
          icon: <AccountBoxIcon className="mr-3" />,
          link: "/settings",
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
