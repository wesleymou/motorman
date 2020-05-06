import { combineReducers } from 'redux'
import auth from './ducks/auth'
import themes from './ducks/themes'
import navigation from './ducks/navigation'
import userList from './ducks/userList'
import user from './ducks/user'
import teamList from './ducks/teamList'
import team from './ducks/team'
import teamRoles from './ducks/teamRoles'
import planList from './ducks/planList'
import plan from './ducks/plan'

const rootReducer = combineReducers({
  auth,
  themes,
  navigation,
  userList,
  user,
  teamList,
  teamRoles,
  team,
  planList,
  plan,
})

export default rootReducer
