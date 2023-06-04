import { HYDRATE } from "next-redux-wrapper";
import { PayloadAction } from "@reduxjs/toolkit";

import { buildSlice } from "@/shared/lib";

import { StateSchema } from "@/_app/Providers";

import { ISport } from "@/entities/sport";
import { IGymReadInfo } from "@/entities/gym";
import { ITrainerSportInfo } from "@/entities/trainer";

import { RoleProfileInformationState } from "../types/roleProfileInformationState";
import { transformSportToTrainerSportInfo } from "../../lib/helpers/transformSportToTrainerSportInfo/transformSportToTrainerSportInfo";
import { transformGymReadInfoToGymInfo } from "../../lib/helpers/transformGymReadInfoToGymInfo/transformGymReadInfoToGymInfo";

const initialState: RoleProfileInformationState = {
  trainerSports: [],
  gymAdminGyms: [],
  organisationAdminOrganisationId: 0,
  newOrganisationName: null,
  newOrganisationDescription: null,
};

const roleProfileInformationSlice = buildSlice({
  name: "trainerProfileInformation",
  initialState,
  reducers: {
    setInitialData(
      state,
      action: PayloadAction<Partial<RoleProfileInformationState>>
    ) {
      state.trainerSports = action.payload.trainerSports ?? [];
      state.gymAdminGyms = action.payload.gymAdminGyms ?? [];
      state.organisationAdminOrganisationId =
        action.payload.organisationAdminOrganisationId ?? 0;
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
      // @ts-ignore
      state.trainerSports[index][key] = value;
    },
    setGymAdminGyms(state, action: PayloadAction<IGymReadInfo[] | null>) {
      state.gymAdminGyms = transformGymReadInfoToGymInfo(action.payload ?? []);
    },
    setOrganisationAdminOrganisation(state, action: PayloadAction<number>) {
      state.organisationAdminOrganisationId = action.payload;
    },
    setNewOrganisationName(state, action: PayloadAction<string | null>) {
      state.newOrganisationName = action.payload;
    },
    setNewOrganisationDescription(state, action: PayloadAction<string | null>) {
      state.newOrganisationDescription = action.payload;
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
