import { PayloadAction } from "@reduxjs/toolkit";
import { TrainerExerciseFlitersSchema } from "../types/TrainerExerciseFlitersSchema";
import { buildSlice } from "@/shared/lib";

const initialState: TrainerExerciseFlitersSchema = {
  name: "",
  sports: [],
  isMine: true,
  bodyParts: [],
};

export const TrainerExerciseFlitersSlice = buildSlice({
  name: "TrainerExerciseFliters",
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSports(state, action: PayloadAction<number[]>) {
      state.sports = action.payload;
    },
    setBodyParts(state, action: PayloadAction<number[]>) {
      state.bodyParts = action.payload;
    },
    setIsMine(state, action: PayloadAction<boolean>) {
      state.isMine = action.payload;
    },
    resetFilters(state) {
      state.name = initialState.name;
      state.sports = initialState.sports;
      state.bodyParts = initialState.bodyParts;
      state.isMine = false;
    },
  },
});

export const {
  useActions: useTrainerExerciseFlitersActions,
  actions: TrainerExerciseFlitersActions,
  reducer: TrainerExerciseFlitersReducer,
} = TrainerExerciseFlitersSlice;
