import { IRegisterForm } from '@features/UnloggedLayout/interfaces'

export const useRegister = () => {
  const registration = (data: IRegisterForm) => {
    console.log('===data===', data)
  }

  return { registration }
}
