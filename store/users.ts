// features/users/usersSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getUsers } from '../services/api'
import { User } from '../components/types'

interface UsersState {
  users: User[]
  selectedUser: User | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
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
  reducers: {
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload)
      if (state.selectedUser?.id === action.payload) {
        state.selectedUser = null
      }
    },
    selectUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload
    }
  },
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

export const { removeUser, selectUser } = usersSlice.actions
export default usersSlice.reducer
