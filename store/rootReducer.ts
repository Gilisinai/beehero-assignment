import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './users'
import postsReducer from './posts'

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
