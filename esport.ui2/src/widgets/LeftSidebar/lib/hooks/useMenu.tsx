import {
  BriefcaseIcon,
  CogIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { PersonStanding } from "lucide-react";

import { routes } from "@/shared/config";

import { useAuth } from "@/entities/user";
import { useProfileInfo } from "@/entities/profile";

import { IMenuItem } from "../../types/menu-item";

import MenuIcon from "../../ui/MenuIcon/MenuIcon";

type ShowMenuParams = {
  condition: boolean;
  onTrue?: IMenuItem[];
  onFalse?: IMenuItem[];
};

interface UseMenuResult {
  menu: IMenuItem[];
  isLoading: boolean;
}

export const useMenu = (): UseMenuResult => {
  const { user, isAuth, isOrganisationAdmin, isTrainer, isGymAdmin } =
    useAuth();
  const {
    isProfileLoading,
    profileOrganisationId,
    isProfileError,
    isConfirmedOrgAdmin,
  } = useProfileInfo({
    userId: user?.id || 0,
    forceFetch: isAuth,
  });

  const menuItems = ({ condition, onFalse, onTrue }: ShowMenuParams) => {
    if (condition) {
      return onTrue ?? [];
    }
    return onFalse ?? [];
  };

  const unLoggedMenu: IMenuItem[] = [
    {
      title: "Streams",
      icon: <MenuIcon Svg={ComputerDesktopIcon} />,
      link: routes.Streams(),
    },
    {
      title: "Competitions",
      icon: <MenuIcon Svg={BriefcaseIcon} />,
      link: routes.Competition.Home(),
      items: isAuth
        ? [
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
          ]
        : undefined,
    },
  ];

  if (!isAuth || isProfileError) {
    return {
      isLoading: false,
      menu: unLoggedMenu,
    };
  }

  return {
    isLoading: isProfileLoading,
    menu: [
      ...unLoggedMenu,
      ...menuItems({
        condition: isOrganisationAdmin || isGymAdmin,
        onTrue: [
          {
            title: "Organisation",
            icon: <MenuIcon Svg={UserGroupIcon} />,
            items: [
              ...menuItems({
                condition: isConfirmedOrgAdmin,
                onTrue: [
                  {
                    title: "Settings",
                    link: routes.Organisation.EditOrganisation([
                      profileOrganisationId,
                    ]),
                  },
                ],
              }),
              {
                title: "Gyms",
                link: routes.Organisation.Gyms([profileOrganisationId]),
              },
              {
                title: "Admins",
                link: routes.Organisation.PendingAdmins([
                  profileOrganisationId,
                ]),
              },
            ],
          },
        ],
      }),
      ...menuItems({
        condition: isTrainer,
        onTrue: [
          {
            title: "Trainer room",
            icon: <MenuIcon Svg={PersonStanding} />,
            gap: true,
            items: [
              {
                title: "Timetable",
                link: routes.Trainer.Timetable(),
              },
            ],
          },
        ],
      }),

      ...menuItems({
        condition: isAuth,
        onTrue: [
          {
            title: "Settings",
            icon: <MenuIcon Svg={CogIcon} />,
            link: routes.Settings(),
            gap: true,
          },
        ],
      }),
    ],
  };
};
