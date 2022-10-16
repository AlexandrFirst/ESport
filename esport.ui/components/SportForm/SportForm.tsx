import React, { PropsWithChildren } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'

interface SportFormProps<TData> extends PropsWithChildren {
  methods: UseFormReturn<TData>
  className?: string
}

export function SportForm<TData>({ methods, className, children }: SportFormProps<TData>) {
  return (
    <FormProvider {...methods}>
      <form className={className}>{children}</form>
    </FormProvider>
  )
}
