import api from '../../services/api'

// Actions
const TEAM_FETCHED = 'app/team/TEAM_FETCHED'
const TEAM_UPDATED = 'app/team/TEAM_UPDATED'
const TEAM_CREATED = 'app/team/TEAM_CREATED'

// Reducer
const defaultState = null

export default function reducer(state = defaultState, { type, payload }) {
  switch (type) {
    case TEAM_FETCHED:
    case TEAM_CREATED:
      return { ...payload }
    case TEAM_UPDATED:
      return { ...state, ...payload }
    default:
      return state
  }
}

// Action creators
export const teamFeched = team => ({ type: TEAM_FETCHED, payload: team })
export const teamUpdated = team => ({ type: TEAM_UPDATED, payload: team })
export const teamCreated = team => ({ type: TEAM_CREATED, payload: team })

// Thunks
export const fetchTeam = id => dispatch =>
  api.get(`/team/${id}`).then(({ data }) => dispatch(teamFeched(data)))

export const removeTeam = team => dispatch =>
  api.delete(`/team/${team.id}`).then(() => dispatch(teamUpdated({ ...team, active: false })))

export const restoreTeam = team => dispatch =>
  api.put(`/team/restore/${team.id}`).then(() => dispatch(teamUpdated({ ...team, active: true })))

export const updateTeam = team => dispatch =>
  api.put(`/team/${team.id}`, team).then(() => dispatch(teamUpdated(team)))

export const createTeam = team => dispatch =>
  api.post(`/team`, team).then(({ data }) => dispatch(teamCreated(data)))

export const createEnroll = team => dispatch =>
  api.post(`/team/enroll/${team.id}`, team).then(({ data }) => dispatch(teamUpdated(data)))

export const removeEnroll = team => dispatch =>
  api.post(`/team/unenroll/${team.id}`, team).then(({ data }) => dispatch(teamUpdated(data)))
