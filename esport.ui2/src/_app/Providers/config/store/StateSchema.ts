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

export interface StateSchema {
  leftSidebar: LeftSidebarSliceState;
  snackbar: SnackbarSchema;
  user: UserSchema;
  device: DeviceSliceState;
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
