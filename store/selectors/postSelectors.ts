// selectors/postsSelectors.ts
import { createSelector } from 'reselect'
import { RootState } from '../rootReducer'

const getPostsState = (state: RootState) => state.posts

export const getPostsByUserId = createSelector(
  [getPostsState, (state: RootState, userId: number) => userId],
  (postsState, userId) => {
    const posts = postsState.userPosts[userId] || []
    // console.log(
    //   'getPostsByUserId called with:',
    //   userId,
    //   'returning posts:',
    //   posts
    // )
    return posts
  }
)
