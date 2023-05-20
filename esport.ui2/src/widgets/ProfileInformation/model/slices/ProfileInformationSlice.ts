import { HYDRATE } from "next-redux-wrapper";
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/shared/lib";

import { IProfile, IProfileInfo } from "@/entities/profile";

import { StateSchema } from "@/_app/Providers";

import { ProfileInformationState } from "../types/ProfileInformationState";

export type SetEditableProfileParams = {
  profileKey: keyof IProfile;
  profileInfoKey: keyof IProfileInfo;
  value: string;
};

const defaultValuesForProfileInfo: IProfileInfo = {
  email: "",
  name: "",
  photoId: null,
  surname: "",
  telephoneNumber: "",
  userId: 0,
};

const initialState: ProfileInformationState = {
  currentProfile: null,
  editableProfile: {
    userIdentityInfo: defaultValuesForProfileInfo,
    userTraineeInfo: defaultValuesForProfileInfo,
    userTrainerInfo: defaultValuesForProfileInfo,
    userAdminInfo: defaultValuesForProfileInfo,
    userOrganisationAdminInfos: [defaultValuesForProfileInfo],
  },
  overrideLoginInfo: null,
};

const profileInformationSlice = buildSlice({
  name: "profileInformation",
  initialState,
  reducers: {
    setCurrentProfile(state, action: PayloadAction<IProfile | null>) {
      state.currentProfile = action.payload;
    },
    setEditableProfile(state, action: PayloadAction<IProfile>) {
      state.editableProfile = action.payload;
    },
    setEditableProfileByKey(
      state,
      { payload }: PayloadAction<SetEditableProfileParams>
    ) {
      console.log("===payload===", payload);
      const { profileKey, profileInfoKey, value } = payload;
      if (!Array.isArray(state.editableProfile[profileKey])) {
        console.log("In first if");
        // @ts-ignore
        state.editableProfile[profileKey][profileInfoKey] = value;
      } else {
        console.log("In else");
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
