import React from "react";
import styles from "./sportSearch.module.scss";

import { useRouter } from "next/router";
import cn from "classnames";
import { useForm } from "react-hook-form";

import SearchIcon from "@mui/icons-material/Search";

import { SportInput, SportInputProps } from "@shared/ui/SportInput/SportInput";
import {
  SportIconButton,
  SportIconButtonProps,
} from "@shared/ui/SportIconButton/SportIconButton";

import { SportForm } from "@features/SportForm";

import { Search } from "@widgets/SportSearch/types/search.type";

interface SportSearchProps {
  name?: string;
  onSubmit?: (search: Search) => void;
  inputProps?: SportInputProps;
  iconButtonProps?: SportIconButtonProps;
  withAppendQuery?: boolean;
  className?: string;
}

export const SportSearch: React.FC<SportSearchProps> = ({
  onSubmit,
  inputProps,
  iconButtonProps,
  name = "q",
  withAppendQuery = true,
  className,
}) => {
  const methods = useForm<Search>();

  const router = useRouter();

  const handleSubmit = methods.handleSubmit((data) => {
    if (withAppendQuery) {
      router.replace({
        query: { ...router.query, [name]: data?.[name] },
      });
    }
    onSubmit?.(data);
  });

  return (
    <SportForm
      methods={methods}
      className={cn(styles.form, className)}
      onSubmit={handleSubmit}
    >
      <SportInput
        {...inputProps}
        {...methods.register(name)}
        placeholder="Search"
        variant={inputProps?.variant ?? "standard"}
        fullWidth={inputProps?.fullWidth ?? false}
        className={cn(inputProps?.className, styles.input)}
      />
      <SportIconButton
        {...iconButtonProps}
        className={cn(iconButtonProps?.className, styles.icon_button)}
        type={"submit"}
      >
        <SearchIcon />
      </SportIconButton>
    </SportForm>
  );
};
