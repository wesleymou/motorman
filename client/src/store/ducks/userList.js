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
export const userFetched = users => ({ type: USERS_FETCHED, payload: users })
export const userUpdated = user => ({ type: USER_UPDATED, payload: user })

// Thunks
export const fetchUsers = () => dispatch =>
  api.get('/user').then(({ data }) => dispatch(userFetched(data)))

export const updateUser = user => dispatch =>
  userStore.updateUser(user).then(({ payload }) => dispatch(userUpdated(payload)))

export const searchUsers = fullName => dispatch =>
  api.get(`/user/search?fullName=${fullName}`).then(({ data }) => dispatch(userFetched(data)))
