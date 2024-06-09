import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './users'

const rootReducer = combineReducers({
  users: usersReducer
  // other reducers
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
