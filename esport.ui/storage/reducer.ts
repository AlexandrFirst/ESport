import { combineReducers } from 'redux'
import { userReducer } from './slices/user'

export const reducer = combineReducers({
  user: userReducer,
})
