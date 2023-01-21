import React from "react";
import styles from "./form.module.css";

import { useRouter } from "next/router";
import { UseFormReturn } from "react-hook-form";
import cn from "classnames";

import { Grid, Typography } from "@mui/material";

import { routes } from "routes";

import { useMedia } from "@hooks/useMedia";

import { ILoginForm } from "@features/UnloggedLayout/interfaces";
import { Dividers } from "@features/UnloggedLayout/components/Dividers/Dividers";

import { SportInput } from "@components/SportInput/SportInput";
import { SportForm } from "@components/SportForm/SportForm";
import { SportButton } from "@components/SportButton/SportButton";
import { SportLink } from "@components/SportLink/SportLink";
import { SportPasswordInput } from "@components/SportPasswordInput/SportPasswordInput";

import { authService } from "@api/auth/authService";
import { useWrapApi } from "@hooks/useWrapApi";

interface FormProps {
  methods: UseFormReturn<ILoginForm>;
}

export const Form: React.FC<FormProps> = ({ methods }) => {
  const { register } = methods;
  const { isMobile } = useMedia();

  const router = useRouter();
  const withErrorAndLoading = useWrapApi();

  const onSubmit = methods.handleSubmit(async (data) =>
    withErrorAndLoading(authService.login, data, {
      onSuccess: () => {
        router.push(routes.Test);
      },
    })
  );

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
      <SportButton className="w-full my-5" onClick={onSubmit}>
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
