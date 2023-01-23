import React from "react";
import styles from "./categoriesWithSearch.module.scss";

import { Grid } from "@mui/material";

import { ICategory } from "@entities/competition";

import { SportSearch } from "@widgets/SportSearch/SportSearch";
import { Search } from "@widgets/SportSearch/types/search.type";

interface CategoriesWithSearchProps {
  categories: ICategory[];
}

export const CategoriesWithSearch: React.FC<CategoriesWithSearchProps> = ({
  categories,
}) => {
  const handleSearch = async (value: Search) => {
    console.log(value.q);
    //TODO: add API for search categories
  };

  return (
    <>
      <Grid item xs={3} className={styles.search_container}>
        <SportSearch onSubmit={handleSearch} />
      </Grid>
    </>
  );
};
