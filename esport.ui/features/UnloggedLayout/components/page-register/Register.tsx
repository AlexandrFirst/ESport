import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { IRegisterForm } from '@features/UnloggedLayout/interfaces'
import { RegisterSteps } from '@features/UnloggedLayout/enums'

import { Left } from '../Left/Left'
import { Main } from '../Main/Main'
import { Right } from '../Right/Right'

import { Form } from './Form/Form'
import { RegisterStepper } from './Stepper/Stepper'

export const Register: React.FC = () => {
  const methods = useForm<IRegisterForm>()
  const [currStep, setCurrStep] = useState(RegisterSteps.MainInfo)

  return (
    <Main
      leftComponent={<Left />}
      rightComponent={
        <Right title='Adventure starts here 🚀' subtitle='Please sign-in to your account and start the adventure'>
          <RegisterStepper currStep={currStep} />
          <Form methods={methods} currStep={currStep} setCurrStep={setCurrStep} />
        </Right>
      }
    />
  )
}
