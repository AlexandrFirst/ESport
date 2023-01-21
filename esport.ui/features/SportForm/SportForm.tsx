import React, { PropsWithChildren } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";

interface SportFormProps extends PropsWithChildren {
  methods: UseFormReturn<any>;
  className?: string;
}

export function SportForm({ methods, className, children }: SportFormProps) {
  return (
    <FormProvider {...methods}>
      <form className={className}>{children}</form>
    </FormProvider>
  );
}
