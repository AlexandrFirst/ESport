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
