import React from 'react'
import {Route, IndexRoute} from 'react-router'
import App from '../containers/app'
import Home from '../containers/home'
import Contact from '../containers/contact'
import NoMatch from '../containers/no-match'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/contact" component={Contact} />
    <Route path="*" component={NoMatch} />
  </Route>
)
