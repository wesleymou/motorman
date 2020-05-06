import { combineReducers } from 'redux'
import themes from './ducks/themes'
import navigation from './ducks/navigation'
import userList from './ducks/userList'
import user from './ducks/user'

import teamList from './ducks/teamList'
import team from './ducks/team'
import teamRoles from './ducks/teamRoles'
import auth from './ducks/auth'

const rootReducer = combineReducers({
  themes,
  navigation,
  userList,
  user,
  teamList,
  teamRoles,
  team,
  auth,
})

export default rootReducer
