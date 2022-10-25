import { combineReducers } from 'redux'
import { loadingIndicatorReducer } from './slices/loadingIndicator'
import { userReducer } from './slices/user'

export const reducer = combineReducers({
  user: userReducer,
  loadingIndicator: loadingIndicatorReducer,
})
