import {
  AnyAction,
  EnhancedStore,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import { CombinedState } from "redux";

import { UserSchema } from "@/entities/user";
import { LeftSidebarSliceState } from "@/widgets/LeftSidebar";
import { SnackbarSchema } from "@/features/Snackbar";

import { DeviceSliceState } from "@/shared/model";
import { ProfileSchema } from "@/entities/profile";
import {
  ProfileInformationState,
  TrainerProfileInformationState,
} from "@/widgets/ProfileInformation";

export interface StateSchema {
  leftSidebar: LeftSidebarSliceState;
  snackbar: SnackbarSchema;
  user: UserSchema;
  profile: ProfileSchema;
  device: DeviceSliceState;
  profileInformation: ProfileInformationState;
  trainerProfileInformation: TrainerProfileInformationState;
}

export type StateSchemaKey = keyof StateSchema;
export type MountedReducers = OptionalRecord<StateSchemaKey, boolean>;

export interface ReducerManager {
  getReducerMap: () => ReducersMapObject<StateSchema>;
  reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
  add: (key: StateSchemaKey, reducer: Reducer) => void;
  remove: (key: StateSchemaKey) => void;
  // true - вмонтирован, false - демонтирован
  getMountedReducers: () => MountedReducers;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
  reducerManager: ReducerManager;
}
