import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { StateSchema } from "@/_app/Providers";
import { buildSlice } from "@/shared/lib";

import { UserRole } from "../../constants/user-role";

import { IUser } from "../types/user";
import { UserSchema } from "../types/userSchema";

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
  data: null,
};

const userSlice = buildSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.isAuth = true;
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.isAuth = false;
      state.data = null;
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
