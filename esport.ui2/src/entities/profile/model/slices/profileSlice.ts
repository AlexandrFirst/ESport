import { HYDRATE } from "next-redux-wrapper";
import { PayloadAction } from "@reduxjs/toolkit";

import { StateSchema } from "@/_app/Providers";
import { buildSlice } from "@/shared/lib";

import { ProfileSchema } from "../types/profileSchema";
import { IProfile, IProfileInfo } from "../types/profile";

type PayloadByKey = { key: keyof IProfile; data: IProfileInfo | null };

const initialState: ProfileSchema = {
  data: null,
};

export const profileSlice = buildSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, { payload }: PayloadAction<IProfile>) {
      state.data = payload;
    },
    resetProfile(state) {
      state.data = null;
    },
    setProfileByKey(state, { payload }: PayloadAction<PayloadByKey>) {
      let profileKey = state.data?.[payload.key];
      profileKey = payload.data as any;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => {
      return {
        ...state,
        ...action.payload.profile,
      };
    },
  },
});

export const {
  actions: profileActions,
  reducer: profileReducer,
  useActions: useProfileActions,
} = profileSlice;
