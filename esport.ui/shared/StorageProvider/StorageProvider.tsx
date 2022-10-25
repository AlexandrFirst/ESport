import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import { store } from '@storage/store'

export const StorageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
