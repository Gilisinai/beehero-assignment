import { createSelector } from 'reselect'
import { RootState } from '../rootReducer'

const getPostsState = (state: RootState) => state.posts

export const getPostsByUserId = createSelector(
  [getPostsState, (state: RootState, userId: number) => userId],
  (postsState, userId) => {
    const posts = postsState.userPosts[userId] || []
    return posts
  }
)
