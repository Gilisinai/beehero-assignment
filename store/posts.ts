// features/posts/postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getUserPosts } from '../services/api'
import { Post } from '../components/types'
import { RootState } from './rootReducer'

interface PostsState {
  userPosts: { [key: number]: Post[] }
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  userPosts: {},
  status: 'idle',
  error: null
}

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number) => {
    const response = await getUserPosts(userId)
    return { userId, posts: response.data }
  }
)

export const conditionalFetchUserPosts = createAsyncThunk(
  'posts/conditionalFetchUserPosts',
  async (userId: number, { getState, dispatch }) => {
    const state = getState() as RootState
    const posts = state.posts.userPosts[userId]
    if (!posts || posts.length === 0) {
      await dispatch(fetchUserPosts(userId))
    }
    return { userId }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removePost: (
      state,
      action: PayloadAction<{ userId: number; postId: number }>
    ) => {
      const { userId, postId } = action.payload
      if (state.userPosts[userId]) {
        state.userPosts[userId] = state.userPosts[userId].filter(
          (post) => post.id !== postId
        )
      }
    },
    updatePost: (
      state,
      action: PayloadAction<{
        userId: number
        postId: number
        title: string
        body: string
      }>
    ) => {
      const { userId, postId, title, body } = action.payload
      if (state.userPosts[userId]) {
        const post = state.userPosts[userId].find((post) => post.id === postId)
        if (post) {
          post.title = title
          post.body = body
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        const { userId, posts } = action.payload
        state.status = 'succeeded'
        state.userPosts[userId] = posts
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch posts'
      })
  }
})

export const { removePost, updatePost } = postsSlice.actions
export default postsSlice.reducer
