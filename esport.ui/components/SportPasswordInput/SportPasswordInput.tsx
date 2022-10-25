import React, { useState } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import cn from 'classnames'

import { FormHelperText, InputAdornment, OutlinedInput, OutlinedInputProps } from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { SportIconButton } from '@components/SportIconButton/SportIconButton'

type SportPasswordInputProps = OutlinedInputProps & {
  name: string
  className?: string
}

export const SportPasswordInput: React.FC<SportPasswordInputProps> = ({ id, name, defaultValue, className, inputProps, fullWidth = true, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [visible, setVisible] = useState(false)

  const handleClickShowPassword = () => {
    setVisible(prev => !prev)
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            {...props}
            {...field}
            id={id}
            type={visible ? 'text' : 'password'}
            fullWidth={fullWidth}
            // error={!!errors[name]?.message}
            className={cn('text-skin-main rounded-lg', className)}
            inputProps={{
              ...inputProps,
              className: cn('text-skin-main rounded-lg', inputProps?.className),
            }}
            color='primary'
            endAdornment={
              <InputAdornment position='end'>
                <SportIconButton aria-label='toggle password visibility' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()} edge='end'>
                  {visible ? <VisibilityOff className='text-skin-main' /> : <Visibility className='text-skin-main' />}
                </SportIconButton>
              </InputAdornment>
            }
          />
        )}
      />
      {errors[name]?.message && (
        <FormHelperText style={{ color: '#d32f2f', marginLeft: '14px' }} id={id}>
          {errors[name]?.message as string}
        </FormHelperText>
      )}
    </>
  )
}
