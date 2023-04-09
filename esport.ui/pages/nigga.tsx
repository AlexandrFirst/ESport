import React from "react";

import { NextPage } from "next";
import { useForm } from "react-hook-form";

import SettingsIcon from "@mui/icons-material/Settings";

import { MainLayout } from "@layouts/MainLayout";

import { useAppSelector } from "@shared/lib/hooks/useStore";

import { selectLoadingIndicator } from "@features/TopPageLoader/model/topPageLoader.slice";
import { SportForm } from "@features/SportForm";

import { getAppInitialProps } from "@shared/lib";

import { SportIconButton } from "@shared/ui/SportIconButton/SportIconButton";
import { SportInput } from "@shared/ui/SportInput/SportInput";
import { SportButton } from "@shared/ui/SportButton/SportButton";
import { useLoader } from "@features/TopPageLoader";

const Nigga: NextPage<{ todo: any }> = (props) => {
  const { isLoading } = useAppSelector(selectLoadingIndicator);
  const { hideLoader, showLoader } = useLoader();

  const handleClick = () => {
    isLoading ? hideLoader() : showLoader();
  };

  const methods = useForm();

  return (
    <MainLayout>
      <SportForm methods={methods}>
        <SportInput name={"test"} label={"Nigga"} endIcon={<SettingsIcon />} />
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

export default Nigga;

Nigga.getInitialProps = getAppInitialProps(async () => {});
