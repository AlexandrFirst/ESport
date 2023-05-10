import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { StateSchema } from "@/_app/Providers";
import { buildSlice } from "@/shared/lib";

import { IAccount } from "../types/user";
import { UserSchema } from "../types/userSchema";
import { UserRole } from "@/shared/constants";

const initialState: UserSchema = {
  isAuth: true,
  currentRole: UserRole.Admin,
  // user: {
  //   name: "John Doe",
  //   email: "john@doe.com",
  //   roles: [UserRole.Admin],
  //   role: UserRole.Pupil,
  //   id: "1",
  // },
  account: null,
};

const userSlice = buildSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAccount>) => {
      state.isAuth = true;
      state.account = action.payload;
    },
    resetUser: (state) => {
      state.isAuth = false;
      state.account = null;
    },
    setCurrentRole(state, action: PayloadAction<UserRole>) {
      state.currentRole = action.payload;
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

export const {
  actions: userActions,
  reducer: userReducer,
  useActions: useUserActions,
} = userSlice;
