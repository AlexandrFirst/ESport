import React from 'react'
import cn from 'classnames'
import { SportInput, SportInputProps } from '@components/SportInput/SportInput'

type RegisterInputProps = SportInputProps & {
  isHided?: boolean
}

export const RegisterInput: React.FC<RegisterInputProps> = ({ isHided, ...props }) => {
  const inputClassName = 'my-3 transition-opacity'
  const inputTransitionClassName = 'opacity-0 scale-y-0 h-0 absolute'

  return <SportInput {...props} className={cn(inputClassName, { [inputTransitionClassName]: isHided })} />
}
