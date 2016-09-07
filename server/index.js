import dotenv from 'dotenv'
import cssHook from 'css-modules-require-hook'
import stylus from 'stylus'

dotenv.load(`${__dirname}/../.env`)

cssHook({
  generateScopedName: '[hash:base64]',
  extensions: ['.styl'],
  preprocessCss: (css, filename) => {
    return stylus(css)
      .set('filename', filename)
      .render()
  }
})

require('./app')
