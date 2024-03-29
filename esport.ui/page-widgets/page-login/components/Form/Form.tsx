import React, { useContext } from "react";
import styles from "./form.module.css";

import { useRouter } from "next/router";

import cn from "classnames";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Grid, Typography } from "@mui/material";

import { routes } from "routes";

import { useMedia } from "@shared/lib/hooks/useMedia";
import { useWrapApi } from "@shared/lib/hooks/useWrapApi";

import { Dividers } from "@shared/ui/Dividers/Dividers";
import { SportInput } from "@shared/ui/SportInput/SportInput";
import { SportButton } from "@shared/ui/SportButton/SportButton";
import { SportLink } from "@shared/ui/SportLink/SportLink";
import { SportPasswordInput } from "@shared/ui/SportPasswordInput/SportPasswordInput";

import { authService } from "@entities/user/api/auth/authService";

import { SportForm } from "@features/SportForm/SportForm";

import { useValidation } from "@page-widgets/page-login/lib/hooks";
import { ILoginForm } from "@page-widgets/page-login/types/login-form";
import { Context } from "../../../../pages/login";

export const Form: React.FC = () => {
  const { isMobile } = useMedia();

  const validationSchema = useValidation();

  const methods = useForm<ILoginForm>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();
  const withErrorAndLoading = useWrapApi();
  const { httpsAgent } = useContext(Context);

  const onSubmit = methods.handleSubmit(
    async (data) => {
      const res = await authService.login(data, {
        httpsAgent: JSON.parse(httpsAgent),
      });
      console.log("===res===", res);
      if (res) {
        router.push(routes.Test);
      }
    },
    // withErrorAndLoading(
    //   {
    //     onSuccess: () => {
    //       router.push(routes.Test);
    //     },
    //   }
    // ),
    (err) => console.log(err)
  );

  return (
    <SportForm
      methods={methods}
      // className={cn("text-center", {
      //   ["w-full"]: isMobile,
      //   ["w-80"]: !isMobile,
      // })}
      className={cn(styles.form, { [styles.form_mobile]: isMobile })}
    >
      <SportInput
        {...methods.register("mail")}
        className={styles.input}
        label={"E-mail"}
      />
      <SportPasswordInput
        {...methods.register("password")}
        className={styles.input}
        label="Password"
      />
      <SportLink className={styles.link} to={routes.Register}>
        Forgot password?
      </SportLink>
      <SportButton isNew className={styles.btn} onClick={onSubmit}>
        Login
      </SportButton>
      <span className={styles.text}>New on our platform? </span>
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
