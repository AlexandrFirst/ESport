import React from "react";
import styles from "./form.module.css";

import { UseFormReturn } from "react-hook-form";
import cn from "classnames";

import { Grid, Typography } from "@mui/material";

import { useMedia } from "@hooks/useMedia";

import { ILoginForm } from "@features/UnloggedLayout/interfaces";
import { routes } from "routes";

import { SportInput } from "@components/SportInput/SportInput";
import { SportForm } from "@components/SportForm/SportForm";
import { SportButton } from "@components/SportButton/SportButton";
import { SportLink } from "@components/SportLink/SportLink";
import { SportPasswordInput } from "@components/SportPasswordInput/SportPasswordInput";

import { Dividers } from "../../Dividers/Dividers";
import { useLogin } from "../useLogin";

interface FormProps {
  methods: UseFormReturn<ILoginForm>;
}

export const Form: React.FC<FormProps> = ({ methods }) => {
  const { handleSubmit, register } = methods;
  const { isMobile } = useMedia();
  const login = useLogin();

  return (
    <SportForm
      methods={methods}
      className={cn("text-center", {
        ["w-full"]: isMobile,
        ["w-80"]: !isMobile,
      })}
    >
      <SportInput {...register("mail")} className="my-3" placeholder="E-mail" />
      <SportPasswordInput
        {...register("password")}
        className="my-3"
        placeholder="Password"
      />
      <SportLink className={"float-right"} to={routes.Register}>
        Forgot password?
      </SportLink>
      <SportButton className="w-full my-5" onClick={handleSubmit(login)}>
        Login
      </SportButton>
      <Typography component={"span"} className={styles.text}>
        New on our platform?{" "}
      </Typography>
      <SportLink to={routes.Register}>Create an account</SportLink>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className="mt-6"
      >
        <Dividers>
          <Typography
            component={"span"}
            className={cn(styles.text, styles.divider)}
          >
            or
          </Typography>
        </Dividers>
      </Grid>
    </SportForm>
  );
};
