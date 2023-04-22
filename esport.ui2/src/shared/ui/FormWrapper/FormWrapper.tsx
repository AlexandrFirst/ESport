import { FormEvent, ReactNode } from "react";

import {
  FieldValue,
  FieldValues,
  FormProvider,
  UseFormReturn,
} from "react-hook-form";

interface FormWrapperProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  className?: string;
  onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

export function FormWrapper<T extends FieldValues>({
  methods,
  className,
  onSubmit,
  children,
}: FormWrapperProps<T>) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormProvider>
  );
}
