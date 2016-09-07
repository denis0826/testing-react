import webpack from 'webpack'
import webpackConfig from '../webpack.config'
import webpackDevMiddleware from 'koa-webpack-dev-middleware'
import webpackHotMiddleware from 'koa-webpack-hot-middleware'
import koa from 'koa'
import serve from 'koa-static'
import React from 'react'
import Helmet from 'react-helmet'
import {renderToString} from 'react-dom/server'
import {Provider} from 'react-redux'
import {match, RouterContext, createMemoryHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {configureStore} from '../utils/store'
import serialize from 'serialize-javascript'
import bodyParser from 'koa-bodyparser'
import fs from 'fs'
import template from './template'
import reducers from '../reducers'
import routes from '../routes'

const isDevelopment = process.env.NODE_ENV === 'development'
const app = koa()

if (isDevelopment) {
  const webpackCompiler = webpack(webpackConfig)
  const devMiddleware = webpackDevMiddleware(webpackCompiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
  const hotMiddleware = webpackHotMiddleware(webpackCompiler)

  app.use(devMiddleware)
  app.use(hotMiddleware)
}

app.use(bodyParser())
app.use(serve(`${__dirname}/../static`))

app.use(function *(next) {

  const store = configureStore()
  const memoryHistory = createMemoryHistory(this.url)
  const history = syncHistoryWithStore(memoryHistory, store)

  match({history, routes, location: this.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      this.status = 500
      this.body = error.message
    } else if (redirectLocation) {
      this.redirect(`${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (!renderProps) {
      this.status = 404
      this.body = 'Not Found'
    } else {
      const root = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      const data = Helmet.rewind()
      data.root = root
      data.initialState = serialize(store.getState())
      data.epoch = new Date().getTime()
      const html = template(data)
      this.body = html
    }
  })

})

app.listen(process.env.PORT || 80)
