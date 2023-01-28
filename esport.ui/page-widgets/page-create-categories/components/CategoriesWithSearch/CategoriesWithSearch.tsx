import React from "react";
import styles from "./categoriesWithSearch.module.css";

import { useRouter } from "next/router";
import { Grid } from "@mui/material";

import { routes } from "routes";

import { ICategory } from "@entities/competition";

import { SportSearch } from "@widgets/SportSearch/SportSearch";
import { Search } from "@widgets/SportSearch/types/search.type";
import { SportActionCard } from "@shared/ui/SportActionCard/SportActionCard";

interface CategoriesWithSearchProps {
  categories: ICategory[];
}

export const CategoriesWithSearch: React.FC<CategoriesWithSearchProps> = ({
  categories,
}) => {
  const router = useRouter();

  const handleSearch = async (value: Search) => {
    console.log(value.q);
    //TODO: add API for search categories
  };

  const navigateToCategory = async (catId: string) => {
    await router.push(
      routes.Competition.Category.Id(
        router.query.competitionId as string,
        catId
      )
    );
  };

  return (
    <>
      <Grid item xs={3} className={styles.search_container}>
        <SportSearch onSubmit={handleSearch} />
      </Grid>
      {categories.map(({ _id, title }) => (
        <SportActionCard
          key={_id}
          onClick={() => navigateToCategory(_id ?? "")}
        >
          {title}
        </SportActionCard>
      ))}
    </>
  );
};
