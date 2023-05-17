import { buildSlice } from "@/shared/lib";
import { ProfileInformationState } from "../types/ProfileInformationState";
import { PayloadAction } from "@reduxjs/toolkit";
import { IProfile } from "@/entities/profile";
import { HYDRATE } from "next-redux-wrapper";
import { StateSchema } from "@/_app/Providers";

const initialState: ProfileInformationState = {
  currentProfile: null,
};

const profileInformationSlice = buildSlice({
  name: "profileInformation",
  initialState,
  reducers: {
    setCurrentProfile(state, action: PayloadAction<IProfile | null>) {
      state.currentProfile = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => ({
      ...state,
      ...action.payload.profileInformation,
    }),
  },
});

export const {
  useActions: useProfileInformationActions,
  reducer: profileInformationReducer,
  actions: profileInformationActions,
} = profileInformationSlice;
