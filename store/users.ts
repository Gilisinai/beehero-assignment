// features/users/usersSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from '../services/api'
import { User } from '../components/types'

interface UsersState {
  users: User[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await getUsers()
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch users'
      })
  }
})

export default usersSlice.reducer
