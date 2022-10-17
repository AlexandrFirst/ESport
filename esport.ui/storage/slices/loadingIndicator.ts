import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@storage/store'

interface LoadingIndicatorState {
  isLoading: boolean
}

const initialState: LoadingIndicatorState = {
  isLoading: false,
}

const loadingIndicator = createSlice({
  name: 'loadingIndicator',
  initialState,
  reducers: {
    showLoading(state) {
      state.isLoading = true
    },
    hideLoading(state) {
      state.isLoading = false
    },
  },
})

export const { showLoading, hideLoading } = loadingIndicator.actions
export const loadingIndicatorReducer = loadingIndicator.reducer
export const selectLoadingIndicator = (state: RootState) => state.loadingIndicator
