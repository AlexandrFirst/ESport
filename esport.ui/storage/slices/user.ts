import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@storage/store'

interface UserState {
  isAuth: boolean
}

const initialState: UserState = {
  isAuth: false,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn(state) {
      state.isAuth = true
    },
    logOut(state) {
      state.isAuth = false
    },
  },
})

export const { logIn, logOut } = user.actions
export const userReducer = user.reducer
export const selectUser = (state: RootState) => state.user
