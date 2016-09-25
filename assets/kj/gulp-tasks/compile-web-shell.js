import webpack from 'webpack'
import * as DEV_CONST from '../const'
import shell from 'gulp-shell'

export default (context) => {
  return {
    deps: [],
    fn: shell.task(`webpack --config ./dev/webpack.config.babel.js --progress --color ${__PROD__ ? '-p' : '-d'} --display-error-details`)
  }
}
