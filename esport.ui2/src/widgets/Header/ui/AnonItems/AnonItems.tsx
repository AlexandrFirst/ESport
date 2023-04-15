import React, { FC, memo } from "react";
import styles from "./AnonItems.module.css";
import Link from "next/link";

import { routes } from "@/shared/config";

import { ListItem } from "../ListItem/ListItem";
import { UILink } from "@/shared/ui";

const AnonItems: FC = () => {
  return (
    <ListItem>
      <UILink href={routes.Login}>Login</UILink>
    </ListItem>
  );
};

export default memo(AnonItems);
