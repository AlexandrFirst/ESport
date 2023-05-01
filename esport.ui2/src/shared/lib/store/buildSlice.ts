import { useMemo } from "react";

import {
  bindActionCreators,
  CaseReducerActions,
  createSlice,
  CreateSliceOptions,
  SliceCaseReducers,
} from "@reduxjs/toolkit";

import { useAppDispatch } from "@/shared/lib";

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);

  const useActions = () => {
    const dispatch = useAppDispatch();

    return useMemo(
      () =>
        bindActionCreators<
          // @ts-ignore
          CaseReducerActions<CaseReducers>,
          // @ts-ignore
          CaseReducerActions<CaseReducers>
        >(slice.actions, dispatch),
      [dispatch]
    );
  };

  return { ...slice, useActions };
}
