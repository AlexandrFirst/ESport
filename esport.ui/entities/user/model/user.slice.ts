import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { RootState } from "@app/store/store";

import { IUser } from "../types/user.interface";

const mocked_User: IUser = { name: "John", lastName: "Doe", role: "Admin" };

interface UserState {
  isAuth: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state) {
      state.isAuth = true;
      state.user = mocked_User;
    },
    logOut(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {},
  },
});

export const { logIn, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
