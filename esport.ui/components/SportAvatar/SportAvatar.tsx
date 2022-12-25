import React from "react";
import { Avatar } from "@mui/material";

interface SportAvatarProps {
  name?: string;
}

export const SportAvatar: React.FC<SportAvatarProps> = ({ name }) => {
  return <Avatar>{name?.at(0)}</Avatar>;
};
