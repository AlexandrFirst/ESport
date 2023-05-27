import { HYDRATE } from "next-redux-wrapper";
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/shared/lib";

import { ITrainerSportInfo } from "@/entities/profile";

import { StateSchema } from "@/_app/Providers";
import { ISport } from "@/entities/sport";

import { RoleProfileInformationState } from "../types/roleProfileInformationState";
import { transformSportToTrainerSportInfo } from "../../lib/helpers/transformSportToTrainerSportInfo/transformSportToTrainerSportInfo";
import { IGymInfo } from "@/entities/gym";

const initialState: RoleProfileInformationState = {
  trainerSports: [],
  gymAdminGyms: [],
};

const roleProfileInformationSlice = buildSlice({
  name: "trainerProfileInformation",
  initialState,
  reducers: {
    setInitialData(state, action: PayloadAction<RoleProfileInformationState>) {
      state.trainerSports = action.payload.trainerSports;
      state.gymAdminGyms = action.payload.gymAdminGyms;
    },
    setTrainerSports(state, action: PayloadAction<ITrainerSportInfo[]>) {
      state.trainerSports = action.payload;
    },
    setTrainerSportsBySports(state, action: PayloadAction<ISport[]>) {
      state.trainerSports = transformSportToTrainerSportInfo(action.payload);
    },
    setTrainerSportsByIndex(
      state,
      action: PayloadAction<{
        index: number;
        key: keyof ITrainerSportInfo;
        value: string | number;
      }>
    ) {
      const { key, value, index } = action.payload;
      console.log("===value, key===", value, key);
      // @ts-ignore
      state.trainerSports[index][key] = value;
    },
    setGymAdminGyms(state, action: PayloadAction<IGymInfo[]>) {
      state.gymAdminGyms = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => ({
      ...state,
      ...action.payload.roleProfileInformation,
    }),
  },
});

export const {
  useActions: useRoleProfileInformationActions,
  reducer: roleProfileInformationReducer,
  actions: roleProfileInformationActions,
} = roleProfileInformationSlice;