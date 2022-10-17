import { useRouter } from 'next/router'

import { IRegisterForm } from '@features/UnloggedLayout/interfaces'

import { useAppDispatch } from '@storage/hooks/useStore'
import { logIn } from '@storage/slices/user'

import { routes } from 'routes'

export const useRegister = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const registration = (data: IRegisterForm) => {
    console.log('===data===', data)

    dispatch(logIn())
    router.push(routes.Test)
  }

  return { registration }
}
