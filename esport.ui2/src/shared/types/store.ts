import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { CombinedState } from "redux";
import { StateSchema } from "@/_app/Providers";

export type StateSchemaStore = ToolkitStore<CombinedState<StateSchema>>;
