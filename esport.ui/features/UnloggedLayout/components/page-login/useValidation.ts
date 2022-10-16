import * as yup from 'yup'

export const useValidation = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('This should be an email').required('This field is required'),
    password: yup.string().required('This field is required'),
  })

  return { validationSchema }
}
