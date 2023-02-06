import React from "react";

import { NextPage } from "next";
import { useForm } from "react-hook-form";

import SettingsIcon from "@mui/icons-material/Settings";

import { SportButton } from "@shared/ui/SportButton/SportButton";
import { MainLayout } from "@layouts/MainLayout";

import { useAppDispatch, useAppSelector } from "@shared/lib/hooks/useStore";
import {
  hideLoading,
  selectLoadingIndicator,
  showLoading,
} from "@features/TopPageLoader/model/topPageLoader.slice";
import { SportIconButton } from "@shared/ui/SportIconButton/SportIconButton";
import { SportForm } from "@features/SportForm";
import { SportInput } from "@shared/ui/SportInput/SportInput";

const Test: NextPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(selectLoadingIndicator);
  const handleClick = () => {
    isLoading ? dispatch(hideLoading()) : dispatch(showLoading());
  };

  const methods = useForm();

  return (
    <MainLayout>
      <SportForm methods={methods}>
        <SportInput name={"test"} label={"Test"} endIcon={<SettingsIcon />} />
      </SportForm>
      <h1 className="text-skin-main px-5">Some content</h1>
      <SportButton variant={"outlined"} onClick={handleClick}>
        Toggle loading
      </SportButton>
      <SportButton onClick={handleClick} loading={isLoading}>
        Toggle loading
      </SportButton>
      <SportButton variant={"text"} onClick={handleClick}>
        Toggle loading
      </SportButton>

      <SportButton isNew onClick={handleClick} variant={"contained"}>
        Toggle loading
      </SportButton>

      <SportIconButton>
        <SettingsIcon />
      </SportIconButton>
    </MainLayout>
  );
};

export default Test;
