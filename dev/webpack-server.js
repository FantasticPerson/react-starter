'use strict';

global.__WEB_PACK_SERVER__ = true;

import * as DEV_CONST from './const'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import {webpackConfig} from './webpack.config.babel'

let express = require('express');
let config = webpackConfig({
    devServer: true
});

let devServer = new WebpackDevServer(webpack(config), {
    contentBase: DEV_CONST.OUTPUT_WEB_DIR,
    publicPath: config.output.publicPath,
    headers: {
        'Access-Control-Allow-Origin': '*',
        "X-Custom-Header": "yes"
    },
    proxy: {
        '*': {
            changeOrigin:true,
            target: 'http://61.155.85.77:10006',
        }
    },
    stats: { colors: true },
    colors: true,
    hot: true,
    lazy: false,
    quiet: false,
    noInfo: false,
    index: 'main.html'
});

devServer.use(express.static(DEV_CONST.ASSETS_PUBLIC_DIR, {maxAge:0}));
devServer.listen(DEV_CONST.DEV_PORT, '0.0.0.0', (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`webpack dev server start, http://127.0.0.1:${DEV_CONST.DEV_PORT}`);
});

