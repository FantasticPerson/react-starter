/**
 * Created by wdd on 2016/9/20.
 */
'use strict';
//!import here, only commonjs here.
//keep top line -------------------------------------------
"compile-inject-pre";

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = 'dev';
//是否为调试模式,默认true
if(process.env.DEBUG === undefined) process.env.DEBUG = 'true';

//__APP_ENV__ process.env.NODE_ENV, [dev, production]
global.__APP_ENV__ = process.env.NODE_ENV;

//console.log(__APP_ENV__);

//是否为 production 模式运行
global.__PROD__ = false;//no support startWith here.
//是否为 dev 模式运行
global.__DEV__ = true;

global.__TEST__ = false;//这个会在mocha里面修改

global.__DEBUG__ = true;

//console.log('-----------------------------', __DEBUG__);

//是否为webPack Server环境, 这个会在 webpack-server 修改
global.__WEB_PACK_SERVER__ = true;

//是否为编译环境
global.__COMPILE__ = false;//这个会在gulp里面修改

//这个为复杂对象, 是否能作为 Macro here?
// global.__APP_JSON__ = require('../package.json');
// global.__APP_ENV_JSON__ = (__APP_JSON__.hasOwnProperty('scripts')) ?
//     Object.assign(__APP_JSON__.common_env, __APP_JSON__.env[__APP_ENV__]) :
//     JSON.parse(new Buffer(__APP_JSON__.env, 'base64').toString('utf8'));

//console.dir(__APP_ENV__);
//console.dir(__APP_ENV_JSON__);

global.__APP_NAME__ = 'dandan.wu';
global.__VERSION__ = '0.0.1';
global.__SWFVERSION__ = 'v2';
global.__ILEARNING_SWF_VERSION__ = 'v2';

//当前运行环境是否为 electron 环境, 这个会在src main 修改
global.__ELECTRON__ = false;

global.__ELECTRON_SHELL__ = false;//是否由内嵌Electron启动执行, 这个会在compile-native-macros 修改

global.__ES6__ = true;//ES6 模块默认是, 这个会在compile-native-macros 修改

//当前运行环境是否为 浏览器 环境, 这个native逻辑上用不到仅仅是为了配合browser和NativeCommon的代码环境
global.__BROWSER__ = false;

//当前运行环境是否为 Node 环境, 这个值与 __BROWSER__ 是互斥的, 这个native逻辑上用不到仅仅是为了配合browser和NativeCommon的代码环境
global.__NODE__ = false;

//一次启动的 session uuid, 这个会使用在运行时和编译时
// global.__LAUNCH_SESSION__ = require('uuid').v1();//time base uuid

global.__LAUNCH_TIME__ = Date.now();

global.__PLATFORM__ = process.platform;
global.__ARCH__ = process.arch;

// global.__WIN__ = __PLATFORM__ === 'win32';
// global.__MAC__ = __PLATFORM__ === 'darwin';

global.__BUILD_TIME_STAMP__ = undefined;
global.__BUILD_TIME_STR = undefined;


//keep bottom line -------------------------------------------
"compile-inject-after";

if(!global.__BUILD_TIME_STAMP__) {
    //dev
    let buildDate = new Date();
    global.__BUILD_TIME_STAMP__ = buildDate.getTime();
    global.__BUILD_TIME_STR__ = buildDate.toString();
}

if(__DEBUG__) {
    console.log('-----------------');
    console.log(`__APP_ENV__: dev`);
    console.log(`__PROD__: false`);
    console.log(`__DEV__: true`);
    console.log(`__DEBUG__: true`);
    console.log(`__WEB_PACK_SERVER__: ${__WEB_PACK_SERVER__}`);
    console.log('-----------------');
}
