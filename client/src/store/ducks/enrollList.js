// Actions
const FETCH_ENROLLS = 'app/enrolls/FETCH_ENROLLS'

// Reducer
const defaultState = {
  treinadores: [],
  auxiliares: [],
  jogadores: [],
}

export default function reducer(state = defaultState, { type, groups }) {
  switch (type) {
    case FETCH_ENROLLS:
      return {
        ...state,
        treinadores: groups.some(g => g.name === 'Treinador')
          ? groups.find(g => g.name === 'Treinador').users
          : [],
        auxiliares: groups.some(g => g.name === 'Auxiliar')
          ? groups.find(g => g.name === 'Auxiliar').users
          : [],
        jogadores: groups.some(g => g.name === 'Jogador')
          ? groups.find(g => g.name === 'Jogador').users
          : [],
      }
    default:
      return state
  }
}

// Action creators
export const fetchEnrolls = groups => ({ type: FETCH_ENROLLS, groups })

// Thunks
export const addEnrolls = ({ team, user, groupName }) => dispatch => {
  const { groups } = team
  const groupIndex = groups.findIndex(g => g.name === groupName)
  groups[groupIndex].users.push(user)
  dispatch(fetchEnrolls(groups))
}

export const removeEnrolls = ({ team, user, groupName }) => dispatch => {
  const { groups } = team
  const groupIndex = groups.findIndex(g => g.name === groupName)
  const userIndex = groups[groupIndex].users.findIndex(u => u.id === user.id)
  console.log(groups[groupIndex].users)
  groups[groupIndex].users.splice(userIndex, 1)
  dispatch(fetchEnrolls(groups))
}
