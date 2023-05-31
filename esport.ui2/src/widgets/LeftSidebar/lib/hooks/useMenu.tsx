import {
  BriefcaseIcon,
  CogIcon,
  ComputerDesktopIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

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
  const { user, isAuth, isOrganisationAdmin, isGymAdmin } = useAuth();
  const {
    isProfileLoading,
    organisationId,
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
        condition: isOrganisationAdmin,
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
                      organisationId,
                    ]),
                  },
                ],
              }),
              {
                title: "Gyms",
                link: routes.Organisation.Gyms([organisationId]),
              },
              {
                title: "Trainers",
                link: routes.Organisation.Gyms([organisationId]),
              },
            ],
          },
        ],
      }),
      ...menuItems({
        condition: isGymAdmin,
        onTrue: [
          {
            title: "My gyms",
            icon: <MenuIcon Svg={HomeIcon} />,
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
