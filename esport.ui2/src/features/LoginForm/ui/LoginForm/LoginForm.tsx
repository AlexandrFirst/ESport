import { FC, useState } from "react";
import styles from "./LoginForm.module.css";

import { useRouter } from "next/router";

import cn from "classnames";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { routes } from "@/shared/config";
import {
  useMedia,
  useSnackbar,
  useUrlWithReturnUrl,
  useWrapApi,
} from "@/shared/lib";
import { Button, FormWrapper, Input, PasswordInput, UILink } from "@/shared/ui";

import { AuthService } from "@/entities/user";

import { ILoginForm } from "../../model/types/LoginFormSchema";
import { useValidation } from "../../lib/hooks/useValidation";

interface LoginFormProps {
  className?: string;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const { isMobile } = useMedia();

  const [isLoading, setIsLoading] = useState(false);
  const { showError } = useSnackbar();
  const registerWithReturnUrl = useUrlWithReturnUrl(routes.Register());

  const validationSchema = useValidation();

  const methods = useForm<ILoginForm>({
    resolver: yupResolver(validationSchema),
  });

  const router = useRouter();
  const withErrorAndLoading = useWrapApi();

  const handleSubmit = methods.handleSubmit(async (data) => {
    setIsLoading(true);
    await withErrorAndLoading(AuthService().login, data, {
      onSuccess() {
        const returnUrl = router.query.returnUrl as Maybe<string>;
        router.push(returnUrl || routes.Home());
      },
      onError: (err) => {
        showError(err.message || "Something went wrong");
      },
      onFinally: () => {
        setIsLoading(false);
      },
    });
  }, console.log);

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
      <UILink href={registerWithReturnUrl}>Create an account</UILink>
    </FormWrapper>
  );
};
