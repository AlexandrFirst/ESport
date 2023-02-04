import React, { forwardRef, useState } from "react";
import styles from "./sportPasswordInput.module.css";

import { useFormContext } from "react-hook-form";
import cn from "classnames";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { SportIconButton } from "../SportIconButton/SportIconButton";
import { SportInput, SportInputProps } from "@shared/ui/SportInput/SportInput";

type SportPasswordInputProps = SportInputProps & {
  name: string;
  className?: string;
};

export const SportPasswordInput = forwardRef<
  HTMLDivElement,
  SportPasswordInputProps
>(function SportPasswordInput({ name, type, ...props }, ref) {
  const {
    formState: { errors },
  } = useFormContext();
  const refInput = React.useRef<HTMLInputElement>(ref ?? null);

  const [visible, setVisible] = useState(false);

  const handleClickShowPassword = () => {
    refInput?.current?.focus();
    refInput.current.selectionStart = refInput.current.value.length;
    refInput.current.selectionEnd = refInput.current.value.length;
    setVisible((prev) => !prev);
  };

  const hasError = !!errors[name]?.message;

  return (
    <SportInput
      {...props}
      name={name}
      ref={refInput}
      type={visible ? "text" : "password"}
      endIcon={
        <SportIconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          edge="end"
        >
          {visible ? (
            <VisibilityOff
              className={cn(styles.icon, { [styles.error]: hasError })}
            />
          ) : (
            <Visibility
              className={cn(styles.icon, { [styles.error]: hasError })}
            />
          )}
        </SportIconButton>
      }
    />
  );
});

// <Controller
//   name={name}
//   control={control}
//   render={({ field }) => (
//     <OutlinedInput
//       {...props}
//       {...field}
//       id={id}
//       sx={{
//         borderColor: "inherit",
//       }}
//       type={visible ? "text" : "password"}
//       fullWidth={fullWidth}
//       className={cn(styles.input_container, className)}
//       classes={{
//         root: styles.root,
//         focused: styles.focus,
//       }}
//       inputProps={{
//         ...inputProps,
//         className: cn(styles.input, inputProps?.className, {
//           [styles.error]: hasError,
//         }),
//       }}
//       error={hasError}
//       color="primary"
//       endAdornment={
//         <InputAdornment position="end">
//           <SportIconButton
//             aria-label="toggle password visibility"
//             onClick={handleClickShowPassword}
//             onMouseDown={(e) => e.preventDefault()}
//             edge="end"
//           >
//             {visible ? (
//               <VisibilityOff
//                 className={cn(styles.icon, { [styles.error]: hasError })}
//               />
//             ) : (
//               <Visibility
//                 className={cn(styles.icon, { [styles.error]: hasError })}
//               />
//             )}
//           </SportIconButton>
//         </InputAdornment>
//       }
//     />
//   )}
// />
// {hasError && (
//   <FormHelperText className={styles.error_helper_text} id={id}>
//     {errors[name]?.message as string}
//   </FormHelperText>
// )}
