import {createStore, applyMiddleware} from 'redux'
import {browserHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from '../reducers'

export function configureStore(initialState = {}) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(routerMiddleware(browserHistory), thunk, logger())
  )
}
