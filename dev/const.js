let path = require('path');

export const APP_DEBUG = true;

export const DEV_PORT = 3999;
export const EMBED_FILE_MAX_SIZE = 10000;
export const APP_DIR = path.join(__dirname, '..');
export const CACHE_DIR = path.resolve(APP_DIR,'.cache');
export const STORAGE_DIR = path.resolve(CACHE_DIR,'.storage');
export const NODE_MODULES_CACHE_FILE = path.resolve(CACHE_DIR,'.node_modules.tar');
export const NODE_MODULES_DIR = path.resolve(APP_DIR,'node_modules');

export const DEV_DIR = path.resolve(APP_DIR,'dev');
export const DEV_GULP_TASKS_DIR = path.resolve(DEV_DIR,'gulp-tasks');

export const SRC_DIR = path.resolve(APP_DIR,'web');

export const WEB_BOOTUP_NAME = 'bootup';
export const WEB_MAIN_NAME = 'main';
export const WEB_DEBUG_NAME = 'debug';

export const SRC_WEB_HTML_TEMPALTES_DIR = path.resolve(SRC_DIR,'templates');
export const SRC_WEB_HTML_STYLES_DIR = path.resolve(SRC_DIR,'styles');

export const SRC_WEB_MAIN_FILE = path.resolve(SRC_DIR,WEB_MAIN_NAME+'.js');
export const SRC_WEB_BOOTUP_FILE = path.resolve(SRC_DIR,WEB_BOOTUP_NAME+'.js');

export const SRC_WEB_HTML_BOOTUP_FILE = path.resolve(SRC_WEB_HTML_TEMPALTES_DIR,WEB_BOOTUP_NAME+'.jade');
export const SRC_WEB_HTML_MAIN_FILE = path.resolve(SRC_WEB_HTML_TEMPALTES_DIR,WEB_MAIN_NAME+'.jade');

export const ASSETS_DIR = path.resolve(APP_DIR,'assets');
export const ASSETS_PUBLIC_DIR = path.resolve(ASSETS_DIR,'public');

export const ASSETS_ICONS_DIR = path.resolve(ASSETS_DIR,'icons');
export const ASSETS_ICONS_APP_ICO_FILE = path.resolve(ASSETS_ICONS_DIR,'app.ico');
export const ASSETS_ICONS_APP_ICNS_FILE = path.resolve(ASSETS_ICONS_DIR,'app.icns');
export const ASSETS_ICONS_16X16_ICON = path.resolve(ASSETS_ICONS_DIR,'app-16x16.ico');

export const OUTPUT_DIR = path.resolve(APP_DIR,'dist');
export const OUTPUT_NODE_MODULES_DIR = path.resolve(OUTPUT_DIR,'node_modules');
export const OUTPUT_WEB_DIR = path.resolve(OUTPUT_DIR,'public');
export const OUTPUT_WEB_HTML_MAIN_FILE = `${WEB_MAIN_NAME}.html`;
export const OUTPUT_WEB_HTML_BOOTUP_FILE = `${WEB_BOOTUP_NAME}.html`;
export const OUTPUT_WEB_HTMLDEBUG_FILE = `${WEB_DEBUG_NAME}.html`;

export const BUILD_DIR = `${APP_DIR}/build`;



