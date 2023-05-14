import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { StateSchema } from "@/_app/Providers";
import { buildSlice } from "@/shared/lib";
import { UserRole } from "@/shared/constants";

import { IUser } from "../types/user";
import { UserSchema } from "../types/userSchema";

const initialState: UserSchema = {
  // currentRole: UserRole.Admin,
  data: null,
};

const userSlice = buildSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => {
      state.data = payload;
    },
    resetUser: (state) => {
      state.data = null;
    },
    setCurrentRole(state, action: PayloadAction<UserRole>) {
      // state.currentRole = action.payload;
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
