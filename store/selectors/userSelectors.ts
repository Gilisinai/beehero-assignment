import { createSelector } from 'reselect'
import { RootState } from '../rootReducer'

const getUsersState = (state: RootState) => state.users

export const getUsers = createSelector([getUsersState], (usersState) => {
  const users = usersState.users

  return users
})

export const getSelectedUser = createSelector([getUsersState], (usersState) => {
  const selectedUser = usersState.selectedUser

  return selectedUser
})
