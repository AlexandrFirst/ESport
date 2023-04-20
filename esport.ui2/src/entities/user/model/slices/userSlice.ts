import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { StateSchema } from "@/_app/Providers";

import { IUser } from "../types/user";
import { UserSchema } from "../types/userSchema";

const initialState: UserSchema = {
  isAuth: true,
  user: {
    name: "John Doe",
    email: "john@doe.com",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.isAuth = true;
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
