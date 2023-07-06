import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { buildSlice } from "@/shared/lib";

import { GymsFiltersSchema } from "../types/GymsFiltersSchema";

const initialState: GymsFiltersSchema = {
  address: null,
  closeHour: null,
  name: null,
  openHour: null,
  organisationIds: null,
};

export const GymsFiltersSlice = buildSlice({
  name: "GymsFilters",
  initialState,
  reducers: {
    setGymsFilters: (
      state,
      action: PayloadAction<Partial<GymsFiltersSchema>>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setAddress(state, action: PayloadAction<string | null>) {
      state.address = action.payload;
    },
    setCloseHour(state, action: PayloadAction<string | null>) {
      state.closeHour = action.payload;
    },
    setName(state, action: PayloadAction<string | null>) {
      state.name = action.payload;
    },
    setOpenHour(state, action: PayloadAction<string | null>) {
      state.openHour = action.payload;
    },
    setOrganisationIds(state, action: PayloadAction<number[] | null>) {
      state.organisationIds = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.gymsFilters,
      };
    },
  },
});

export const {
  actions: GymsFiltersActions,
  reducer: GymsFiltersReducer,
  useActions: useGymsFiltersActions,
} = GymsFiltersSlice;
