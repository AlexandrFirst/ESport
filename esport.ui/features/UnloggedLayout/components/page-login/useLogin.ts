import { ILoginForm } from '@features/UnloggedLayout/interfaces'

export const useLogin = () => {
  const login = async (data: ILoginForm) => {
    console.log('===data===', data)
  }

  return { login }
}
