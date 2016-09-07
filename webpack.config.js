require('dotenv').load()

var webpack = require('webpack')
var path = require('path')
var isDevelopment = process.env.NODE_ENV === 'development'
var entries = ['./client/index.js']
var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  // TODO: Work on hot module stuff when react-hot-loader v3 is out
  //new webpack.HotModuleReplacementPlugin(),
  //new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': Object.keys(process.env).reduce(function (o, k) {
      o[k] = JSON.stringify(process.env[k])
      return o
    }, {})
  })
]

if (isDevelopment) {
  // TODO: waiting... on react-hot-loader
  //entries.push('webpack-hot-middleware/client?reload=true')
} else {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  ])
}

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'static', 'js'),
    publicPath: '/js',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader?modules', 'stylus-loader']
      }
    ]
  },
  plugins: plugins
}
