import React, { FormEvent, PropsWithChildren } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface SportFormProps extends PropsWithChildren {
  methods: UseFormReturn<any>;
  className?: string;
  onSubmit?: (e?: FormEvent<HTMLFormElement>) => void;
}

export function SportForm({
  methods,
  className,
  onSubmit,
  children,
}: SportFormProps) {
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
