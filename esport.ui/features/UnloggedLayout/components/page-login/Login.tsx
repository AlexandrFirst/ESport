import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ILoginForm } from '@features/UnloggedLayout/interfaces'

import { Left } from '../Left/Left'
import { Main } from '../Main'
import { Right } from '../Right/Right'

import { Form } from './Form/Form'
import { useValidation } from './useValidation'

export const Login: React.FC = () => {
  const { validationSchema } = useValidation()

  const methods = useForm<ILoginForm>({
    resolver: yupResolver(validationSchema),
  })

  return (
    <Main
      leftComponent={<Left />}
      rightComponent={
        <Right title='Welcome to E-Sport 👋🏻' subtitle='Please sign-in to your account and start the adventure'>
          <Form methods={methods} />
        </Right>
      }
    />
  )
}
