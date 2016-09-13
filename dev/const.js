/**
 * Created by dandan.wu on 16/9/13.
 */
let path = require('path')

export const APP_DIR = path.join(__dirname, '..');

export const NODE_MODULES_DIR = `${APP_DIR}/node_modules`;

export const DEV_DIR = `${APP_DIR}/dev`;
export const DEV_GULP_TASKS_DIR = `${DEV_DIR}/gulp-tasks`;

export const SRC_DIR = `${APP_DIR}/src`;
export const SRC_COMMON_DIR = `${SRC_DIR}/common`;
export const SRC_NATIVE_DIR = `${SRC_DIR}/native`;

export const SRC_NATIVE_MAIN_FILE = `${SRC_NATIVE_DIR}/main.js`;

export const WEB_BOOTUP_NAME = 'bootup';
export const WEB_MAIN_NAME = 'main';
export const WEB_VERDOR_COMMON_NAME = 'vendor-common';

export const SRC_WEB_DIR = `${SRC_DIR}/web`;
export const SRC_WEB_HTML_TEMPALTES_DIR = `${SRC_WEB_DIR}/templates`;

export const SRC_WEB_MAIN_FILE = `${SRC_WEB_DIR}/${WEB_MAIN_NAME}.js`;
export const SRC_WEB_BOOTUP_FILE = `${SRC_WEB_DIR}/${WEB_BOOTUP_NAME}.js`;
export const SRC_WEB_VENDOR_COMMON_FILE = `${SRC_WEB_DIR}/${WEB_VERDOR_COMMON_NAME}.js`;

export const SRC_WEB_HTML_BOOTUP_FILE = `${SRC_WEB_HTML_TEMPALTES_DIR}/${WEB_BOOTUP_NAME}.jade`;
export const SRC_WEB_HTML_MAIN_FILE = `${SRC_WEB_HTML_TEMPALTES_DIR}/${WEB_MAIN_NAME}.jade`;

export const ASSETS_DIR = `${APP_DIR}/assets`;
export const ASSETS_PUBLIC_DIR = `${ASSETS_DIR}/public`;
export const ASSETS_ICONS_DIR = `${ASSETS_DIR}/icons`;
export const ASSETS_ICONS_16X16_ICON = `${ASSETS_ICONS_DIR}/app-16x16.ico`;

export const OUTPUT_DIR = `${APP_DIR}/dist`;
export const OUTPUT_NATIVE_DIR = `${OUTPUT_DIR}/src`;
export const OUTPUT_WEB_DIR = `${OUTPUT_DIR}/public`;
export const OUTPUT_WEB_HTML_BOOTUP_FILE = `${WEB_BOOTUP_NAME}.html`;
export const OUTPUT_WEB_HTML_MAIN_FILE = `${WEB_MAIN_NAME}.html`;
