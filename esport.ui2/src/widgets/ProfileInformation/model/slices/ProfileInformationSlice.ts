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
  isEmailForProfileChanged: {
    userTraineeInfo: false,
    userTrainerInfo: false,
    userAdminInfo: false,
    userOrganisationAdminInfos: false,
    userIdentityInfo: false,
  },
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
      { payload }: PayloadAction<keyof Omit<IProfile, "userIdentityInfo">>
    ) {
      switch (payload) {
        case "userTraineeInfo":
        case "userTrainerInfo":
        case "userAdminInfo":
          // @ts-ignore
          state.editableProfile[payload] = {
            name: state.currentProfile?.userIdentityInfo?.name ?? "",
            surname: state.currentProfile?.userIdentityInfo?.surname ?? "",
            email: state.currentProfile?.userIdentityInfo?.email ?? "",
            telephoneNumber:
              state.currentProfile?.userIdentityInfo?.telephoneNumber ?? "",
            id: 0,
            info: "",
            photoId: null,
            userId: 0,
          };
        case "userOrganisationAdminInfos":
          state.editableProfile.userOrganisationAdminInfos = [
            {
              name: state.currentProfile?.userIdentityInfo?.name ?? "",
              surname: state.currentProfile?.userIdentityInfo?.surname ?? "",
              email: state.currentProfile?.userIdentityInfo?.email ?? "",
              telephoneNumber:
                state.currentProfile?.userIdentityInfo?.telephoneNumber ?? "",
              id: 0,
              info: "",
              photoId: null,
              userId: 0,
            },
          ];
      }
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
    resetIsEmailForProfileChanged(state) {
      state.isEmailForProfileChanged = {
        userTraineeInfo: false,
        userTrainerInfo: false,
        userAdminInfo: false,
        userOrganisationAdminInfos: false,
        userIdentityInfo: false,
      };
    },
    setIsEmailForProfileChanged(
      state,
      { payload }: PayloadAction<{ key: keyof IProfile; value: boolean }>
    ) {
      const { key, value } = payload;
      // @ts-ignore
      state.isEmailForProfileChanged[key] = value;
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
