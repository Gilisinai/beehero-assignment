import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './slices/users'
import postsReducer from './slices/posts'

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer
})

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer
