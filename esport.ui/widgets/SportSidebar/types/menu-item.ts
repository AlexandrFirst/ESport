import { ReactNode } from "react";

export interface IMenuItem {
  title: string;
  icon?: ReactNode;
  items?: IMenuItem[];
  link?: string;
  gap?: boolean;
}
