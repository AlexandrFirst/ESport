import React, { FC } from 'react'

import cn from 'classnames'
import { Controller, useFormContext } from 'react-hook-form'

import { TextField, TextFieldProps } from '@mui/material'

export type SportInputProps = TextFieldProps & {
  name: string
}

export const SportInput: FC<SportInputProps> = ({ name, defaultValue, variant = 'filled', inputProps, fullWidth = true, ...props }) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...props}
          {...field}
          InputLabelProps={{ className: 'text-skin-main focus:text-skin-main' }}
          InputProps={{ className: 'rounded-lg text-skin-main' }}
          fullWidth={fullWidth}
          inputProps={{
            ...inputProps,
            className: cn('text-skin-main rounded-lg', inputProps?.className),
          }}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  )
}
