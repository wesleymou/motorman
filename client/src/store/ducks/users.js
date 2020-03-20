import api from '../../services/api'

// Actions
const USER_FETCHED = 'app/users/USER_FETCHED'
const USER_SELECTED = 'app/users/USER_SELECTED'
const USER_UPDATED = 'app/users/USER_UPDATED'

// Reducer
const defaultState = {
  users: [],
  user: null,
}

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case USER_FETCHED:
      return { users: payload.users }
    case USER_SELECTED:
      return { user: payload.user }
    case USER_UPDATED:
      return { user: { ...payload.user } }
    default:
      return state
  }
}

// Action creators
export const userFetched = users => ({ type: USER_FETCHED, payload: { users } })
export const userSelected = user => ({ type: USER_SELECTED, payload: { user } })
export const userUpdated = user => ({ type: USER_UPDATED, payload: { user } })

// Thunks
export const fetchUsers = () => dispatch =>
  api.get('/user').then(({ data }) => dispatch(userFetched(data)))

export const selectUser = id => dispatch =>
  api.get(`/user/${id}`).then(({ data }) => dispatch(userSelected(data)))

export const removeUser = user => dispatch =>
  api.delete(`/user/${user.id}`).then(() => dispatch(userUpdated({ ...user, active: false })))

export const updateUser = user => dispatch =>
  api.put(`/user/${user.id}`).then(() => dispatch(userUpdated({ ...user })))
