import api from '../../services/api'
import * as userStore from './user'

// Actions
const USERS_FETCHED = 'app/users/USERS_FETCHED'
const USER_UPDATED = 'app/users/USER_UPDATED'

// Reducer
const defaultState = []

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case USERS_FETCHED:
      return [...payload]
    case USER_UPDATED: {
      const { id, ...rest } = payload
      const users = [...state]
      const index = users.findIndex(u => u.id === id)
      const user = users[index]
      users.splice(index, 1, { ...user, ...rest })
      return users
    }
    default:
      return state
  }
}

// Action creators
export const usersFetched = users => ({ type: USERS_FETCHED, payload: users })
export const userUpdated = user => ({ type: USER_UPDATED, payload: user })

// Thunks
export const fetchUsers = params => dispatch =>
  api.get('/user', { params }).then(({ data }) => dispatch(usersFetched(data)))

export const updateUser = user => dispatch =>
  userStore.updateUser(user).then(({ payload }) => dispatch(userUpdated(payload)))

export const searchUsers = params => dispatch =>
  api.get(`/user/search`, { params }).then(({ data }) => dispatch(usersFetched(data)))
