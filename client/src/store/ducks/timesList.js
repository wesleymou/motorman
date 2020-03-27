import api from '../../services/api'
import * as timesStore from './times'

// Actions
const TIMES_FETCHED = 'app/times/TIMES_FETCHED'
const TIME_UPDATED = 'app/times/TIME_UPDATED'

// Reducer
const defaultState = []

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case TIMES_FETCHED:
      return [...payload]
    case TIME_UPDATED: {
      const { id, ...rest } = payload
      const times = [...state]
      const index = times.findIndex(u => u.id === id)
      const time = times[index]
      times.splice(index, 1, { ...time, ...rest })
      return times
    }
    default:
      return state
  }
}

// Action creators
export const timesFetched = times => ({ type: TIMES_FETCHED, payload: times })
export const timeUpdated = time => ({ type: TIME_UPDATED, payload: time })

// Thunks
export const fetchTimes = () => dispatch =>
  api.get('/times').then(({ data }) => dispatch(timesFetched(data)))

export const updateTime = time => dispatch =>
  timesStore.updateTime(time).then(({ payload }) => dispatch(timeUpdated(payload)))
