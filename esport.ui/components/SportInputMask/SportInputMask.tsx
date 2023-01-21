import React from "react";
import { SportInput, SportInputProps } from "@components/SportInput/SportInput";

type SportInputMaskProps = SportInputProps & {
  mask: string;
  maskPlaceholder: string;
};

export const SportInputMask: React.FC<SportInputMaskProps> = ({
  mask,
  maskPlaceholder,
  name,
  disabled,
  onChange,
  onBlur,
  ...props
}) => {
  const renderInput = () => () => <SportInput name={name} {...props} />;

  return (
    <></>
    // <Controller
    //   name={name}
    //   render={({ field }) => (
    //     <InputMask
    //       {...props}
    //       {...field}
    //       onChange={onChange}
    //       onBlur={onBlur}
    //       mask="(0)999 999 99 99"
    //       maskChar=" "
    //       disabled={disabled}
    //     >
    //       {renderInput()}
    //     </InputMask>
    //   )}
    // />
  );
};
