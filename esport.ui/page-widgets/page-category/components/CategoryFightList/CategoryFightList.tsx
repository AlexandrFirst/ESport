import React from "react";
import { FightList, ICategory } from "@entities/competition";

interface CategoryFightListProps {
  category: ICategory | null;
}

export const CategoryFightList: React.FC<CategoryFightListProps> = ({
  category,
}) => {
  return !category ? (
    <h1>There is no such category!</h1>
  ) : (
    <FightList category={category} />
  );
};
