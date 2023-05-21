import { HYDRATE } from "next-redux-wrapper";
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/shared/lib";

import { ITrainerSportInfo } from "@/entities/profile";

import { StateSchema } from "@/_app/Providers";

import { TrainerProfileInformationState } from "../../model/types/trainerProfileInformationState";
import { ISport } from "@/entities/sport";
import { transformSportToTrainerSportInfo } from "../../lib/helpers/transformSportToTrainerSportInfo/transformSportToTrainerSportInfo";

const initialState: TrainerProfileInformationState = {
  trainerSports: [],
};

const trainerProfileInformationSlice = buildSlice({
  name: "trainerProfileInformation",
  initialState,
  reducers: {
    setTrainerSports(state, action: PayloadAction<ITrainerSportInfo[]>) {
      state.trainerSports = action.payload;
    },
    setTrainerSportsBySports(state, action: PayloadAction<ISport[]>) {
      console.log("We are in setTrainerSportsBySports");
      state.trainerSports = transformSportToTrainerSportInfo(action.payload);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action: PayloadAction<StateSchema>) => ({
      ...state,
      ...action.payload.trainerProfileInformation,
    }),
  },
});

export const {
  useActions: useTrainerProfileInformationActions,
  reducer: trainerProfileInformationReducer,
  actions: trainerProfileInformationActions,
} = trainerProfileInformationSlice;
