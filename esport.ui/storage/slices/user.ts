import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '@interfaces/app-user'
import { RootState } from '@storage/store'

const mocked_User: IUser = { name: 'John', lastName: 'Doe', role: 'Admin' }

interface UserState {
  isAuth: boolean
  user: IUser | null
}

const initialState: UserState = {
  isAuth: false,
  user: null,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state) {
      state.isAuth = true
      state.user = mocked_User
    },
    logOut(state) {
      state.isAuth = false
      state.user = null
    },
  },
})

export const { logIn, logOut } = user.actions
export const userReducer = user.reducer
export const selectUser = (state: RootState) => state.user
