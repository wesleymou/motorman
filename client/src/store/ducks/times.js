import api from '../../services/api'

// Actions
const TIMES_FETCHED = 'app/time/TIMES_FETCHED'
const TIMES_UPDATED = 'app/time/TIMES_UPDATED'
const TIMES_CREATED = 'app/time/TIMES_CREATED'

// Reducer
const defaultState = null

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case TIMES_FETCHED:
    case TIMES_CREATED:
      return { ...payload }
    case TIMES_UPDATED:
      return { ...state, ...payload }
    default:
      return state
  }
}

// Action creators
export const timesFetched = time => ({ type: TIMES_FETCHED, payload: time })
export const timesUpdated = time => ({ type: TIMES_UPDATED, payload: time })
export const timesCreated = time => ({ type: TIMES_CREATED, payload: time })

// Thunks
export const fetchTime = id => dispatch =>
  api.get(`/team/${id}`).then(({ data }) => dispatch(timesFetched(data)))

export const removeTime = time => dispatch =>
  api.delete(`/team/${time.id}`).then(() => dispatch(timesUpdated({ ...time, active: false })))

export const restoreTime = time => dispatch =>
  api.put(`/team/restore/${time.id}`).then(() => dispatch(timesUpdated({ ...time, active: true })))

export const updateTime = time => dispatch =>
  api.put(`/team/${time.id}`, time).then(() => dispatch(timesUpdated(time)))

export const createTime = time => dispatch =>
  api.post(`/team`, time).then(({ data }) => dispatch(timesCreated(data)))

export const createEnroll = time => dispatch =>
  api.post(`/team/enroll/${time.id}`, time).then(({ data }) => dispatch(timesUpdated(data)))

export const removeEnroll = time => dispatch =>
  api.post(`/team/unenroll/${time.id}`, time).then(({ data }) => dispatch(timesUpdated(data)))
