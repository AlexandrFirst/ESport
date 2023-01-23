import React from "react";
import { SportPageTitle } from "@shared/ui/SportPageTitle/SportPageTitle";

interface CreateCategoriesTitleProps {
  title: string;
}

export const CreateCategoriesTitle: React.FC<CreateCategoriesTitleProps> = ({
  title,
}) => {
  return <SportPageTitle textCenter>Categories for {title}</SportPageTitle>;
};
