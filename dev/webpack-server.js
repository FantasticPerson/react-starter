/**
 * Created by dandan.wu on 16/9/13.
 */
'use strict';

import * as DEV_CONST from './const';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.babel.js');
var path = require('path');
let contentBase = path.join(__dirname, "../dist");
let publicPath = path.join(__dirname, "../public");

function cb(){
    console.info('get callback');
}
new WebpackDevServer(webpack(config,cb), {
    contentBase: contentBase,
    publicPath: '',
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true },
    colors: true,
    hot: true,
    //open: true,
    historyApiFallback: true
}).listen(3999, '0.0.0.0', (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`webpack dev server start, http://localhost:3999`);
});
