import { HYDRATE } from "next-redux-wrapper";
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/shared/lib";

import { IProfile, IProfileInfo } from "@/entities/profile";

import { StateSchema } from "@/_app/Providers";

import { ProfileInformationState } from "../types/ProfileInformationState";
import { defaultValuesForEditableProfile } from "../../constants/defaultValuesForEditableProfile";

export type SetEditableProfileParams = {
  profileKey: keyof IProfile;
  profileInfoKey: keyof IProfileInfo;
  value: string;
};

const initialState: ProfileInformationState = {
  currentProfile: null,
  editableProfile: defaultValuesForEditableProfile,
  overrideLoginInfo: null,
};

const profileInformationSlice = buildSlice({
  name: "profileInformation",
  initialState,
  reducers: {
    setInitialData(state, action: PayloadAction<IProfile>) {
      state.currentProfile = action.payload;
      state.editableProfile = action.payload;
    },
    setCurrentProfile(state, action: PayloadAction<IProfile | null>) {
      state.currentProfile = action.payload;
    },
    setEditableProfile(state, { payload }: PayloadAction<IProfile>) {
      state.editableProfile = payload;
    },
    setEditableProfileNotToNull(
      state,
      { payload }: PayloadAction<keyof IProfile>
    ) {
      // @ts-ignore
      state.editableProfile[payload] = defaultValuesForEditableProfile[payload];
    },
    setEditableProfileByKey(
      state,
      { payload }: PayloadAction<SetEditableProfileParams>
    ) {
      const { profileKey, profileInfoKey, value } = payload;
      if (!Array.isArray(state.editableProfile[profileKey])) {
        // @ts-ignore
        state.editableProfile[profileKey][profileInfoKey] = value;
      } else {
        // @ts-ignore
        state.editableProfile[profileKey][0][profileInfoKey] = value;
      }
    },
    setOverrideProfile(state, action: PayloadAction<keyof IProfile | null>) {
      state.overrideLoginInfo = action.payload;
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
