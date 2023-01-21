import React, { PropsWithChildren } from "react";
import { ListItem } from "@mui/material";

export const HeaderListItem: React.FC<PropsWithChildren> = ({ children }) => {
  return <ListItem className="p-0 mr-6">{children}</ListItem>;
};
