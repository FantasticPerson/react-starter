'use strict';

// import '../src/macros-init'
global.__WEB_PACK_SERVER__ = true;

import * as DEV_CONST from './const'

import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import {webpackConfig} from './webpack.config.babel'

let express = require('express');

let config = webpackConfig({
    devServer: true
});

//process.on('uncaughtException', globalErrHandler);
//process.on('unhandledRejection', globalErrHandler);
//
//function globalErrHandler(err, promise) {
//  let errorStackTrace = err instanceof Error ? err.stack || err.stacktrace || "" : err.toString();
//
//  let errMsg = `p:\n ${!!promise} Err:\n ${errorStackTrace}`;
//  console.error(`Webpack Server crash ${errMsg}`);
//}

let devPort = 3999;

let devServer = new WebpackDevServer(webpack(config), {
    contentBase: DEV_CONST.OUTPUT_WEB_DIR,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "X-Custom-Header": "yes"
    },
    stats: { colors: true },
    colors: true,
    hot: true,
    lazy: false,
    quiet: false,
    noInfo: false,
    index: 'main.html'
    //staticOptions: {
    //  maxAge: 0,
    //  index: 'main.html'
    //}
    //historyApiFallback: {
    //  index: 'main.html'
    //}
});

devServer.use(express.static(DEV_CONST.ASSETS_PUBLIC_DIR, {maxAge:0}));

devServer.listen(devPort, '0.0.0.0', (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`webpack dev server start, http://127.0.0.1:${devPort}`);
});

//we lost the static assets add  here.

