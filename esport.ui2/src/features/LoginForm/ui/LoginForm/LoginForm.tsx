import { FC, useState } from "react";
import styles from "./LoginForm.module.css";

import { useRouter } from "next/router";

import cn from "classnames";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { routes } from "@/shared/config";
import { useMedia, useWrapApi } from "@/shared/lib";
import { Button, FormWrapper, Input, PasswordInput, UILink } from "@/shared/ui";

import { authService } from "@/entities/user";

import { useSnackbar } from "@/features/Snackbar";

import { ILoginForm } from "../../model/types/LoginFormSchema";
import { useValidation } from "../../lib/hooks/useValidation";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { isMobile } = useMedia();

  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useSnackbar();

  const validationSchema = useValidation();

  const methods = useForm<ILoginForm>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();
  const withErrorAndLoading = useWrapApi();

  const handleSubmit = methods.handleSubmit(
    async (data) => {
      setIsLoading(true);
      await withErrorAndLoading(authService.login, data, {
        onSuccess: () => {
          router.push(routes.Home());
        },
        onError: (err) => {
          showError(err.message || "Something went wrong");
        },
        onFinally: () => {
          setIsLoading(false);
        },
      });
    },
    (err) => console.log(err)
  );

  return (
    <FormWrapper
      methods={methods}
      className={cn(styles.form, { [styles.form_mobile]: isMobile() })}
    >
      <Input
        {...methods.register("mail")}
        className={styles.input}
        label={"E-mail"}
      />
      <PasswordInput
        {...methods.register("password")}
        className={styles.input}
        label="Password"
      />
      <UILink className={styles.link} href={routes.Register()}>
        Forgot password?
      </UILink>
      <Button className={styles.btn} onClick={handleSubmit} loading={isLoading}>
        Login
      </Button>
      <span className={styles.text}>New on our platform? </span>
      <UILink href={routes.Register()}>Create an account</UILink>
    </FormWrapper>
  );
};
