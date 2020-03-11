import { combineReducers } from 'redux'
import themes from './ducks/themes'

const rootReducer = combineReducers({
  themes,
})

export default rootReducer
