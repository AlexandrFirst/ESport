import { buildSlice } from "@/shared/lib";
import { GymsFiltersSchema } from "../types/GymsFiltersSchema";
import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

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
