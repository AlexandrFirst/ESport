import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import cn from 'classnames'

import { IRegisterForm } from '@features/UnloggedLayout/interfaces'
import { RegisterSteps } from '@features/UnloggedLayout/enums'

import { SportInput } from '@components/SportInput/SportInput'

import { RegisterInput } from '../RegisterInput/RegisterInput'

interface FirstStepProps {
  currStep: RegisterSteps
  register: UseFormRegister<IRegisterForm>
}

export const FirstStep: React.FC<FirstStepProps> = ({ currStep, register }) => {
  const isHided = currStep !== RegisterSteps.MainInfo
  return (
    <>
      <RegisterInput {...register('firstName')} label={'First name'} isHided={isHided} />
      <RegisterInput {...register('lastName')} label={'Last name'} isHided={isHided} />
      <RegisterInput {...register('email')} label={'Email'} isHided={isHided} />
    </>
  )
}
