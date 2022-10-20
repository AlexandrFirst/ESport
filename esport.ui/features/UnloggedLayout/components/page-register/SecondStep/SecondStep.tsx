import React from 'react'
import { UseFormRegister } from 'react-hook-form'

import { RegisterSteps } from '@features/UnloggedLayout/enums'
import { IRegisterForm } from '@features/UnloggedLayout/interfaces'

import { RegisterInput } from '../RegisterInput/RegisterInput'

interface SecondStepProps {
  currStep: RegisterSteps
  register: UseFormRegister<IRegisterForm>
}

export const SecondStep: React.FC<SecondStepProps> = ({ currStep, register }) => {
  const isHided = currStep !== RegisterSteps.SportInfo

  return (
    <>
      <RegisterInput {...register('level')} label={'Level'} isHided={isHided} />
    </>
  )
}
