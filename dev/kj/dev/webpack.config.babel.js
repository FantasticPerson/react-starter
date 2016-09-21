'use strict';

import '../src/macros-init'
import * as DEV_CONST from './const'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack, {
  DefinePlugin,
  NoErrorsPlugin,
  HotModuleReplacementPlugin,
  ProgressPlugin} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import WebpackErrorPlaugin from './webpack/WebpackErrorPlaugin'

//Dynamic config
//-------------------------------------
let buildDate = new Date();
const BUILD_TIME_STAMP = global.__BUILD_TIME_STAMP__ || buildDate.getTime();
const BUILD_TIME_STR = global.__BUILD_TIME_STR__ || buildDate.toString();

function vendorsConfigs(options) {
  return {
    //for css
    'bootstrap-css': `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap.min.css`,
    'bootstrap-theme-css': `${DEV_CONST.NODE_MODULES_DIR}/bootstrap/dist/css/bootstrap-theme.min.css`,
    'ua-parser-js': `${DEV_CONST.NODE_MODULES_DIR}/ua-parser-js/dist/ua-parser.min.js`
  };
}

function noParseConfig(options) {
  let noParseConfigResult = [];
  let r_vendorsConfigs = vendorsConfigs(options);
  for (let vendorKey in r_vendorsConfigs) {
    noParseConfigResult.push(r_vendorsConfigs[vendorKey]);
  }

  return noParseConfigResult;
}

function headerEmbedJs(options) {
  //这里有可能修改json的内容, just for deep copy
  let appEvnJson = JSON.parse(JSON.stringify(__APP_ENV_JSON__));

  delete appEvnJson.webPrefix;
  delete appEvnJson.webpackDevPort
  delete appEvnJson.basePort;
  delete appEvnJson.embedFileMaxSize;
  delete appEvnJson.logInDebugWindow;
  delete appEvnJson.upstreamURL;

  let appEvnJsonStr = JSON.stringify(appEvnJson).replace(/"/g, "\\\"");
  //console.log(appEvnJsonStr);

  return `
      window.__APP_NAME__ = "${__APP_NAME__}";
      window.__VERSION__ = "${__VERSION__}";
      window.__APP_ENV__ = "${__APP_ENV__}";
      window.__SWFVERSION__ = "${__SWFVERSION__}";
      window.__ILEARNING_SWF_VERSION__ = "${__ILEARNING_SWF_VERSION__}";
      window.__DEV__ = ${__DEV__};
      window.__PROD__ = ${__PROD__};
      window.__DEBUG__ = ${__DEBUG__};
      window.__BUILD_TIME_STAMP__ = ${BUILD_TIME_STAMP};
      window.__BUILD_TIME_STR__ = "${BUILD_TIME_STR}";
      window.__ELECTRON__ = false;
      window.__APP_ENV_JSON__ = window.appEnvJson = JSON.parse("${appEvnJsonStr}");
      if((typeof require !== 'undefined') && require.length === 1) {
        //__ELECTRON__ is runtime check.
        window.render_electron = require('electron');
        if(!!render_electron) {
          window.__ELECTRON__ = true;

          window.os = require('os');

          window.native_remote = render_electron.remote;
          window.native_require = native_remote.require;
          window.render_require = require;
          window.native_getGlobal = native_remote.getGlobal;

          window.__PLATFORM__ = native_getGlobal('__PLATFORM__');
          window.__ARCH__ = native_getGlobal('__ARCH__');
          window.__WIN__ = __PLATFORM__ === 'win32';
          window.__MAC__ = __PLATFORM__ === 'darwin';

          window.__LAUNCH_TIME__ = native_getGlobal('__LAUNCH_TIME__');
          window.electron = native_getGlobal('electron');
          window.electron_app = native_getGlobal('electron_app');
          window.electron_app_path = native_getGlobal('electron_app_path');
          window.electron_app_data_path = native_getGlobal('electron_app_data_path');
          window.electron_app_userData_path = native_getGlobal('electron_app_userData_path');
          window.electron_app_public_path = native_getGlobal('electron_app_public_path');
          window.electron_app_subapp_path = native_getGlobal('electron_app_subapp_path');
          window.electron_app_subapp_rhino_path = native_getGlobal('electron_app_subapp_rhino_path');
        }
      } else {
        window.__LAUNCH_TIME__ = Date.now()
      }

      //for common js.
      window.__BROWSER__ = true;
      window.__NODE__ = !__BROWSER__;

      ${__DEBUG__ ? "console.log('-------------------------------------')" : ""}
      ${__DEBUG__ ? "console.log('__APP_NAME__:', __APP_NAME__)" : ""}
      ${__DEBUG__ ? "console.log('__VERSION__:', __VERSION__)" : ""}
      ${__DEBUG__ ? "console.log('__APP_ENV__:', __APP_ENV__)" : ""}
      ${__DEBUG__ ? "console.log('__DEV__:', __DEV__)" : ""}
      ${__DEBUG__ ? "console.log('__DEBUG__:', __DEBUG__)" : ""}
      ${__DEBUG__ ? "console.log('__LAUNCH_TIME__:', __LAUNCH_TIME__)" : ""}
      ${__DEBUG__ ? "console.log('__BUILD_TIME_STAMP__:', __BUILD_TIME_STAMP__)" : ""}
      ${__DEBUG__ ? "console.log('__BUILD_TIME_STR__:', __BUILD_TIME_STR__)" : ""}
      ${__DEBUG__ ? "console.log('__ELECTRON__:', __ELECTRON__)" : ""}
      ${__DEBUG__ ? "console.log('__APP_ENV_JSON__:', __APP_ENV_JSON__)" : ""}
      ${__DEBUG__ ? "console.log('-------------------------------------')" : ""}
      ${__DEBUG__ ? "console.log('')" : ""}
  `;
}

//console.log(headerEmbedJs);

function entryConfig(options) {
  //let vendorCommonConfig = [DEV_CONST.SRC_WEB_VENDOR_COMMON_FILE];

  //let bootupConfig = [
  //  ...vendorCommonConfig,
  //  DEV_CONST.SRC_WEB_BOOTUP_FILE
  //];

  let mainConfig = [
    //...vendorCommonConfig,
    DEV_CONST.SRC_WEB_MAIN_FILE
  ];

  if (options.devServer) {
    let devServerConfig = [
      `webpack-dev-server/client?http://127.0.0.1:${__APP_ENV_JSON__.webpackDevPort}`,
      `webpack/hot/only-dev-server`
    ];

    //bootupConfig = [
    //  ...devServerConfig,
    //  ...bootupConfig
    //];

    mainConfig = [
      ...devServerConfig,
      ...mainConfig
    ];
  }

  //return {
  //  [DEV_CONST.WEB_BOOTUP_NAME]: bootupConfig,
  //  [DEV_CONST.WEB_MAIN_NAME]: mainConfig,
  //}

  return mainConfig;
}

function outputConfig(options) {
  return {
    path: DEV_CONST.OUTPUT_WEB_DIR,
    publicPath: __APP_ENV_JSON__['webPrefix'] || '',
    filename: `[name]-bundle-[[hash]].js`
  }
}

function resolveConfig(options) {
  return {
    root: [
      DEV_CONST.SRC_WEB_DIR
    ],
    alias: vendorsConfigs(options),
    // you can now require('file') instead of require('file.coffee')
    extensions: [
      '',
      '.js',
      '.css',
      '.json',
      '.styl'
    ]
  }
}

function nodeConfig(options) {
  return {
    __filename: true,
    __dirname: true,
    global: true
  }
}

function htmlWebpackPluginConfig(options) {
  function minifyConfig() {
    if (__DEBUG__) return false;

    //see https://github.com/kangax/html-minifier#options-quick-reference
    return {
      removeComments: true,
      removeCommentsFromCDATA: true,
      collapseInlineTagWhitespace: true,
      minifyJS: true,
      minifyCSS: true
    }
  }

  return {
    title: __APP_JSON__.title,
    version: __APP_JSON__.version,
    //see default html template engine. https://github.com/blueimp/JavaScript-Templates
    //template: DEV_CONST.SRC_WEB_HTML_BOOTUP_FILE,
    //filename: `./${DEV_CONST.OUTPUT_WEB_HTML_BOOTUP_FILE}`,
    favicon: `${DEV_CONST.ASSETS_ICONS_16X16_ICON}`,
    minify: minifyConfig(),
    headerEmbedJs: headerEmbedJs(options),
    //inject: 'body',
    inject: false,
    //hash: true,
    cache: false,//true,
    showErrors: true
  };
}

function externalsConfig(options) {
  return [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}

//--------------------------------------
export function webpackConfig(options) {
  options = options || {};

  return {
    //The base directory (absolute path!) for resolving the entry option
    //But here we have DEV_CONST abs path, so not nessary here.
    context: DEV_CONST.SRC_WEB_DIR,
    //profile: true,
    bail: true,
    debug: __DEBUG__,
    cache: __DEBUG__,
    entry: entryConfig(options),
    output: outputConfig(options),
    resolve: resolveConfig(options),
    devtool: __DEBUG__ ? 'inline-source-map' : false,

    //only in cli?
    //watchOptions: __DEV__ ?
    //{
    //  aggregateTimeout: 1000,
    //  poll: 1000
    //} : false,

    target: 'web', //default
    //target: 'electron', //default
    node: nodeConfig(options),
    externals: externalsConfig(options),
    module: {
      loaders: [
        //js
        {
          test: /\.js[x]?$/,
          include: [DEV_CONST.SRC_DIR],
          exclude: [DEV_CONST.NODE_MODULES_DIR],
          loaders: __DEV__ ? ['babel'] : ['babel']
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
        {test: /\.html$/, loader: "html"},
        {test: /\.jade$/, loader: "jade?pretty=true"},
        //img
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: `url?name=imgs/[name]-[[hash]].[ext]&limit=${DEV_CONST.EMBED_FILE_MAX_SIZE}`
        },

        //fonts
        {
          test: /(\.eot|\.woff2|\.woff|\.ttf|regular\.svg)$/,
          loader: `file?name=fonts/[name]-[[hash]].[ext]`
        },
        {
          test: /\.json$/, loader: 'json'
        }
      ],
      noParse: noParseConfig(options)
    },

    plugins: [

      __DEV__ ? new HotModuleReplacementPlugin() : null,

      //new ProgressPlugin((percentage, msg) => {
      //  console.log((percentage * 100) + '%', msg);
      //  //process.stdout.write(`${(percentage * 100)}'%' ${msg}`);
      //}),
      new NoErrorsPlugin(),

      new webpack.optimize.DedupePlugin(),

      __DEBUG__ ? null : new webpack.optimize.UglifyJsPlugin({
        warnings: false,
        dead_code: true
      }),

      new DefinePlugin({
          'process.env.NODE_ENV': `"${__APP_ENV__}"`,
          __DEV__: __DEV__,
          __PROD__: __PROD__,
          __DEBUG__: __DEBUG__
        }
      ),

      new webpack.optimize.OccurenceOrderPlugin(),

      //new webpack.optimize.CommonsChunkPlugin({
      //  name: `${DEV_CONST.WEB_VERDOR_COMMON_NAME}`,
      //  filename: `${DEV_CONST.WEB_VERDOR_COMMON_NAME}-bundle-[[hash]].js`,
      //}),

      new ExtractTextPlugin(`[name]-bundle-[[contenthash]].css`, {
        allChunks: true
      }),

      //bootup
      //new HtmlWebpackPlugin(Object.assign({
      //  //see default html template engine. https://github.com/blueimp/JavaScript-Templates
      //  template: DEV_CONST.SRC_WEB_HTML_BOOTUP_FILE,
      //  filename: `./${DEV_CONST.OUTPUT_WEB_HTML_BOOTUP_FILE}`,
      //  excludeChunks: [DEV_CONST.WEB_MAIN_NAME]
      //}, htmlWebpackPluginConfig(options))),

      //main
      new HtmlWebpackPlugin(Object.assign({
        //see default html template engine. https://github.com/blueimp/JavaScript-Templates
        template: DEV_CONST.SRC_WEB_HTML_MAIN_FILE,
        filename: `./${DEV_CONST.OUTPUT_WEB_HTML_MAIN_FILE}`,
        excludeChunks: [DEV_CONST.WEB_BOOTUP_NAME]
      }, htmlWebpackPluginConfig(options))),

      //debug
      //new HtmlWebpackPlugin(Object.assign({
      //  //see default html template engine. https://github.com/blueimp/JavaScript-Templates
      //  template: DEV_CONST.SRC_WEB_HTML_DEBUG_FILE,
      //  filename: `./${DEV_CONST.OUTPUT_WEB_HTMLDEBUG_FILE}`,
      //}, htmlWebpackPluginConfig(options))),
    ].filter(function (item) {
      return !!item;
    })
  }
}

let defaultConfig = webpackConfig();
export default defaultConfig;
