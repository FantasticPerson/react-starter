let path = require('path');

export const EMBED_FILE_MAX_SIZE = 10000;

export const APP_DIR = path.join(__dirname, '..');

export const CACHE_DIR = `${APP_DIR}/.cache`;
export const STORAGE_DIR = `${CACHE_DIR}/.storage`;
export const NODE_MODULES_CACHE_FILE = `${CACHE_DIR}/.node_modules.tar`;

export const NODE_MODULES_DIR = `${APP_DIR}/node_modules`;

export const DEV_DIR = `${APP_DIR}/dev`;
export const DEV_GULP_TASKS_DIR = `${DEV_DIR}/gulp-tasks`;

export const SRC_DIR = `${APP_DIR}/src`;
export const SRC_COMMON_DIR = `${SRC_DIR}/common`;
export const SRC_NATIVE_DIR = `${SRC_DIR}/native`;
export const SRC_SERVER_DIR = `${SRC_DIR}/server`;

export const SRC_NATIVE_MAIN_FILE = `${SRC_NATIVE_DIR}/main.js`;

export const VENDER_DIR = `${APP_DIR}/vender`;
export const VENDER_FLASHPLAYER_DIR = `${VENDER_DIR}/flashplayer`;

export const UPDATER_DIR = `${APP_DIR}/updater`;
export const UPDATER_WIN_EXE_FILE_NAME = 'upd.exe';
export const UPDATER_MAC_EXE_FILE_NAME = 'upd.app';

export const WEB_BOOTUP_NAME = 'bootup';
export const WEB_MAIN_NAME = 'main';
export const WEB_DEBUG_NAME = 'debug';
export const WEB_VERDOR_COMMON_NAME = 'vendor-common';

export const SRC_WEB_DIR = `${SRC_DIR}/web`;
export const SRC_WEB_HTML_TEMPALTES_DIR = `${SRC_WEB_DIR}/templates`;
export const SRC_WEB_HTML_STYLS_DIR = `${SRC_WEB_DIR}/styles`;

export const SRC_WEB_MAIN_FILE = `${SRC_WEB_DIR}/${WEB_MAIN_NAME}.js`;
export const SRC_WEB_BOOTUP_FILE = `${SRC_WEB_DIR}/${WEB_BOOTUP_NAME}.js`;

//export const SRC_WEB_VENDOR_COMMON_FILE = `${SRC_WEB_DIR}/${WEB_VERDOR_COMMON_NAME}.js`;

export const SRC_WEB_HTML_BOOTUP_FILE = `${SRC_WEB_HTML_TEMPALTES_DIR}/${WEB_BOOTUP_NAME}.jade`;
export const SRC_WEB_HTML_MAIN_FILE = `${SRC_WEB_HTML_TEMPALTES_DIR}/${WEB_MAIN_NAME}.jade`;
export const SRC_WEB_HTML_DEBUG_FILE = `${SRC_WEB_HTML_TEMPALTES_DIR}/${WEB_DEBUG_NAME}.jade`;

export const LIBS_DIR = `${APP_DIR}/libs`;
export const LIBS_ADDON_DIR = `${LIBS_DIR}/addon`;

export const ASSETS_DIR = `${APP_DIR}/assets`;
export const ASSETS_PUBLIC_DIR = `${ASSETS_DIR}/public`;
export const ASSETS_NATIVE_DIR = `${ASSETS_DIR}/assets`;
export const ASSETS_CERT_DIR = `${ASSETS_DIR}/cert`;
export const ASSETS_ROOT_DIR = `${ASSETS_DIR}/root`;

export const ASSETS_ICONS_DIR = `${ASSETS_DIR}/icons`;
export const ASSETS_ICONS_APP_ICO_FILE = `${ASSETS_ICONS_DIR}/app.ico`;
export const ASSETS_ICONS_APP_ICNS_FILE = `${ASSETS_ICONS_DIR}/app.icns`;
export const ASSETS_ICONS_16X16_ICON = `${ASSETS_ICONS_DIR}/app-16x16.ico`;

export const ASSETS_INSTALL_DIR = `${ASSETS_DIR}/install`;
export const ASSETS_INSTALL_INSTALLER_NSI_TEMPLATE_FILE = `${ASSETS_INSTALL_DIR}/installer.nsi.tpl`;

export const OUTPUT_DIR = `${APP_DIR}/dist`;
export const OUTPUT_NATIVE_ASSETS_DIR = `${OUTPUT_DIR}/assets`;
export const OUTPUT_NATIVE_DIR = `${OUTPUT_DIR}/src`;
export const OUTPUT_NATIVE_DIR_ASAR_FILE = `${OUTPUT_NATIVE_DIR}.asar`;
export const OUTPUT_NODE_MODULES_DIR = `${OUTPUT_DIR}/node_modules`;
export const OUTPUT_WEB_DIR = `${OUTPUT_DIR}/public`;
export const OUTPUT_WEB_HTML_BOOTUP_FILE = `${WEB_BOOTUP_NAME}.html`;
export const OUTPUT_WEB_HTMLDEBUG_FILE = `${WEB_DEBUG_NAME}.html`;
export const OUTPUT_WEB_HTML_MAIN_FILE = `${WEB_MAIN_NAME}.html`;

export const OUTPUT_SERVER = `${SRC_DIR}/ss5`;
export const BUILD_DIR = `${APP_DIR}/build`;

export const BUILD_VERSION_JSON = `${BUILD_DIR}/temp_version.json`;

export const NEED_CODE_SIGN = false;

//export const VERSION_DESC_FILE = `${DEV_DIR}/version.raw.json`;
//export const VERSION_DESC_OUTPUT_FILE = `${DEV_DIR}/version.json`;


