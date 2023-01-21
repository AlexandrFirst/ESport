import React from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { SportIconButton } from "../../../../shared/ui/SportIconButton/SportIconButton";

export const Notifications: React.FC = () => {
  return (
    <>
      <SportIconButton>
        <NotificationsIcon />
      </SportIconButton>
    </>
  );
};
