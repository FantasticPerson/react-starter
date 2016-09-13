/**
 * Created by dandan.wu on 16/9/13.
 */
'use strict';

//import '../src/macros-init'
import * as DEV_CONST from './const'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, {DefinePlugin} from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import getIP from '../src/common/getIP';

//Dynamic config
//-------------------------------------
let buildDate = new Date();
const BUILD_TIME_STAMP = buildDate.getTime();
const BUILD_TIME_STR = buildDate.toString();


function minifyConfig() {
    if(__DEV__) return false;

    //see https://github.com/kangax/html-minifier#options-quick-reference
    return {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    }
}

let vendorsConfigs = {
//for css
    'bootstrap-css': __DEV__ ?
        `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap.css` :
        `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap.min.css`,

    'bootstrap-theme-css': __DEV__ ?
        `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap-theme.css` :
        `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap-theme.min.css`,

    //for js
    'swfobject': `${DEV_CONST.NODE_MODULES_DIR}/swfobject/index.js`,

    'redux': __DEV__ ?
        `${DEV_CONST.NODE_MODULES_DIR}/redux/dist/redux.js` :
        `${DEV_CONST.NODE_MODULES_DIR}/redux/dist/redux.min.js`,

    //here can speed-up the compile. but now something error with all base `react`.

    //we not use bootstrap here.
    //'bootstrap': __DEV__ ?
    //  `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/js/bootstrap.js` :
    //  `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/js/bootstrap.min.js`,

    //'react': __DEV__ ?
    //  `${DEV_CONST.NODE_MODULES_DIR}/react/dist/react.js`:
    //  `${DEV_CONST.NODE_MODULES_DIR}/react/dist/react.min.js`,

    //'react-dom': __DEV__ ?
    //  `${DEV_CONST.NODE_MODULES_DIR}/react-dom/dist/react-dom.js` :
    //  `${DEV_CONST.NODE_MODULES_DIR}/react-dom/dist/react-dom.min.js`,

    //'react-redux': __DEV__ ?
    //  `${DEV_CONST.NODE_MODULES_DIR}/react-redux/dist/react-redux.js` :
    //  `${DEV_CONST.NODE_MODULES_DIR}/react-redux/dist/react-redux.min.js`,

    //'react-bootstrap': __DEV__ ?
    //`${DEV_CONST.NODE_MODULES_DIR}/react-bootstrap/dist/react-bootstrap.js` :
    //`${DEV_CONST.NODE_MODULES_DIR}/react-bootstrap/dist/react-bootstrap.min.js`,
};

let noParseConfig = [];
for(let vendorKey in vendorsConfigs) {
    noParseConfig.push(vendorsConfigs[vendorKey]);
}

let headerEmbedJs =
    `
      window.__APP_ENV__ = "${__APP_ENV__}";
      window.__DEV__ = ${__DEV__};
      window.__PROD__ = ${__PROD__};

      window.__VERSION__ = "${__VERSION__}";
      window.__BUILD_TIME_STAMP__ = "${BUILD_TIME_STAMP}";
      window.__BUILD_TIME_STR__ = "${BUILD_TIME_STR}";
      window.__ADAPTER_URL__ = "${__PROD__ ? __APP_ENV_JSON__['adapterURL'] : ('http://' + getIP() + ':' + __APP_ENV_JSON__['basePort'])}";
      window.__ELECTRON__ = false;
      if((typeof require !== 'undefined') && require.length === 1) {
        if(!!require('electron')) {
          window.electron = require('electron');
          window.os = require('os');
          window.__ELECTRON__ = true;
          window.native_require = require;
          window.__ADAPTER_URL__ = ""
        }
      }

      window.__BROWSER__ = true;
      window.__NODE__ = !__BROWSER__;
  `;
//console.log(headerEmbedJs);

function entryConfig() {
    let vendorCommonConfig = [DEV_CONST.SRC_WEB_VENDOR_COMMON_FILE];

    let bootupConfig = [
        ...vendorCommonConfig,
        DEV_CONST.SRC_WEB_BOOTUP_FILE
    ];

    let mainConfig = [
        ...vendorCommonConfig,
        DEV_CONST.SRC_WEB_MAIN_FILE
    ];


        let devServerConfig = [
            `webpack-dev-server/client?http://0.0.0.0:${__APP_ENV_JSON__.webpackDevPort}`,
            `webpack/hot/only-dev-server`
        ];

        bootupConfig = [
            ...devServerConfig,
            ...bootupConfig
        ];

        mainConfig = [
            ...devServerConfig,
            ...mainConfig
        ];


    return {
        [DEV_CONST.WEB_BOOTUP_NAME] : bootupConfig,
        [DEV_CONST.WEB_MAIN_NAME] : mainConfig,
    }
};

let outputConfig = {
    path: DEV_CONST.OUTPUT_WEB_DIR,
    publicPath: __APP_ENV_JSON__['webPrefix'] || '',
    filename: `[name]-bundle-[[chunkhash]].js`
};

let resolveConfig = {
    root: [
        DEV_CONST.SRC_WEB_DIR
    ],
    alias: vendorsConfigs,
    // you can now require('file') instead of require('file.coffee')
    extensions: [
        '',
        '.js',
        '.css',
        '.json',
        '.styl'
    ]
};

let nodeConfig = {
    __filename:true,
    __dirname:true,
    global:true
};

let htmlWebpackPluginConfig = {
    title: __APP_JSON__.title,
    version: __APP_JSON__.version,
    //see default html template engine. https://github.com/blueimp/JavaScript-Templates
    //template: DEV_CONST.SRC_WEB_HTML_BOOTUP_FILE,
    //filename: `./${DEV_CONST.OUTPUT_WEB_HTML_BOOTUP_FILE}`,
    favicon: `${DEV_CONST.ASSETS_ICONS_16X16_ICON}`,
    minify: minifyConfig(),
    headerEmbedJs: headerEmbedJs,
    //inject: 'body',
    inject:false,
    //hash: true,
    cache: true,
    showErrors: true
};

let externalsConfig = [
    {
        //is external (require("b"))
        //'electron': false,
        function(context, request, callback) {
            //console.log('===========================================', context, request);
            callback();
        }
    }
];


//--------------------------------------

let config = {
    //The base directory (absolute path!) for resolving the entry option
    //But here we have DEV_CONST abs path, so not nessary here.
    context: DEV_CONST.SRC_WEB_DIR,
    profile: true,
    debug: __DEV__,
    cache: __DEV__,
    entry: entryConfig(),
    output: outputConfig,
    resolve: resolveConfig,
    devtool: __DEV__ ? '#inline-source-map' : false,

    //only in cli?
    watchOptions: __DEV__ ?
    {
        aggregateTimeout: 1000,
        poll: 1000
    } : false,

    target: 'web', //default
    //target: 'electron', //default
    node: nodeConfig,

    externals: externalsConfig,

    module: {
        loaders: [
            //js
            {
                test: /\.js$/,
                include: [DEV_CONST.SRC_DIR],
                exclude: [DEV_CONST.NODE_MODULES_DIR],
                loaders: ['react-hot', 'babel'],
            },
            //css
            // Extract css files
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css'])
            },
            // Optionally extract stylus files
            // or any other compile-to-css language
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(['css', 'stylus'])
            },
            //html
            { test: /\.html$/,  loader: "html" },
            { test: /\.jade$/,  loader: "jade?pretty=true" },
            //img
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: `url?name=imgs/[name].[ext]&limit=${__APP_ENV_JSON__['embedFileMaxSize']}}`
            },

            //fonts
            {
                test: /(\.eot|\.woff2|\.woff|\.ttf|regular\.svg)$/,
                loader: `file?name=fonts/[name].[ext]`
            },
        ],
        noParse: noParseConfig
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new DefinePlugin({
            __DEV__: __DEV__,
            __PROD__: __PROD__
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: `${DEV_CONST.WEB_VERDOR_COMMON_NAME}`,
            filename: `${DEV_CONST.WEB_VERDOR_COMMON_NAME}-bundle-[[hash]].js`,
        }),

        new ExtractTextPlugin(`[name]-bundle-[[contenthash]].css`, {
            allChunks: true
        }),

        //bootup
        new HtmlWebpackPlugin(Object.assign({
            //see default html template engine. https://github.com/blueimp/JavaScript-Templates
            template: DEV_CONST.SRC_WEB_HTML_BOOTUP_FILE,
            filename: `./${DEV_CONST.OUTPUT_WEB_HTML_BOOTUP_FILE}`,
            excludeChunks: [DEV_CONST.WEB_MAIN_NAME]
        }, htmlWebpackPluginConfig)),

        //main
        new HtmlWebpackPlugin(Object.assign({
            //see default html template engine. https://github.com/blueimp/JavaScript-Templates
            template: DEV_CONST.SRC_WEB_HTML_MAIN_FILE,
            filename: `./${DEV_CONST.OUTPUT_WEB_HTML_MAIN_FILE}`,
            excludeChunks: [DEV_CONST.WEB_BOOTUP_NAME]
        }, htmlWebpackPluginConfig))
    ]
};

export default config;
