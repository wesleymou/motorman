import api from '../../services/api'

// Actions
const USER_FETCHED = 'app/user/USER_FETCHED'
const USER_UPDATED = 'app/user/USER_UPDATED'
const USER_CREATED = 'app/user/USER_CREATED'

// Reducer
const defaultState = null

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case USER_FETCHED:
    case USER_CREATED:
      return { ...payload }
    case USER_UPDATED:
      return { ...state, ...payload }
    default:
      return state
  }
}

// Action creators
export const userFetched = user => ({ type: USER_FETCHED, payload: user })
export const userUpdated = user => ({ type: USER_UPDATED, payload: user })
export const userCreated = user => ({ type: USER_CREATED, payload: user })

// Thunks
export const fetchUser = id => dispatch =>
  api.get(`/user/${id}`).then(({ data }) => dispatch(userFetched(data)))

export const removeUser = user => dispatch =>
  api.delete(`/user/${user.id}`).then(() => dispatch(userUpdated({ active: false })))

export const restoreUser = user => dispatch =>
  api.post(`/user/restore/${user.id}`).then(() => dispatch(userUpdated({ active: true })))

export const updateUser = user => dispatch =>
  api.put(`/user/${user.id}`, user).then(() => dispatch(userUpdated(user)))

export const createUser = user => dispatch =>
  api.post(`/user`, user).then(({ data }) => dispatch(userCreated(data)))
