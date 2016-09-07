import {combineReducers} from 'redux'
import {routerReducer as routing} from 'react-router-redux'
import me from './me'

export default combineReducers({
  routing,
  me
})
