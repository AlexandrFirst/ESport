import React from "react";

import { NextPage } from "next";

import { SportButton } from "../shared/ui/SportButton/SportButton";
import { MainLayout } from "../layouts/MainLayout/MainLayout";

import { useAppDispatch, useAppSelector } from "../shared/lib/hooks/useStore";
import {
  hideLoading,
  selectLoadingIndicator,
  showLoading,
} from "@features/TopPageLoader/topPageLoader.slice";

const Test: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectLoadingIndicator);
  const handleClick = () => {
    isLoading ? dispatch(hideLoading()) : dispatch(showLoading());
  };

  return (
    <MainLayout>
      <h1 className="text-skin-main px-5">Some content</h1>
      <SportButton variant={"outlined"} onClick={handleClick}>
        Toggle loading
      </SportButton>
      <SportButton onClick={handleClick}>Toggle loading</SportButton>
      <SportButton variant={"text"} onClick={handleClick}>
        Toggle loading
      </SportButton>
    </MainLayout>
  );
};

export default Test;
