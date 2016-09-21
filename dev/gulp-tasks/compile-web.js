import webpack from 'webpack'
import webpackConfig from '../webpack.config.babel'

export default (context) => {
  return {
    fn: (cb) => {
      webpack(webpackConfig, (err, stats) => {
        cb(err);
      });
    }
  }
}
