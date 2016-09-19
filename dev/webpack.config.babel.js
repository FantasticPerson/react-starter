/**
 * Created by dandan.wu on 16/9/13.
 */
'use strict';
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');


// var path = require("path");
module.exports = {
    devtool: "eval-source-map",
    entry: {
        app: [path.join(__dirname, "../web/main.js")]
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "",
        filename: "bundle.js"
    },
    modules: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modeule/,
                loader: ['react-hot', 'babel'],
                query: {
                    presents: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(['css'])
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract(['css', 'stylus'])
            },
            {
                test: /\.html$/, loader: "html"
            },
            {
                test: /\.jade$/, loader: "jade?pretty=true"
            }
        ],
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebpackPlugin(Object.assign({
                //see default html template engine. https://github.com/blueimp/JavaScript-Templates
                template: path.join(__dirname, "../web/templates/bootup.jade"),
                filename: "bootup.html",
                excludeChunks: "main"
            }, htmlWebpackPluginConfig)),

            //main
            new HtmlWebpackPlugin(Object.assign({
                //see default html template engine. https://github.com/blueimp/JavaScript-Templates
                template: path.join(__dirname, "../web/template/main.jade"),
                filename: "main.html",
                excludeChunks: "bootup"
            }, htmlWebpackPluginConfig))
        ]
    }
};
function minifyConfig() {
    return false;
    //see https://github.com/kangax/html-minifier#options-quick-reference
    return {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true
    }
}
//
var htmlWebpackPluginConfig = {
    title: "GoodBye Dear",
    version: "0.0.1",
    // favicon: `${DEV_CONST.ASSETS_ICONS_16X16_ICON}`,
    minify: minifyConfig(),
    // headerEmbedJs: headerEmbedJs,
    //inject: 'body',
    inject:false,
    //hash: true,
    cache: true,
    showErrors: true
};
//
//
// export function webpackConfig() {
//     return {
//         devtool: "eval-source-map",
//         entry: [path.join(__dirname, "../web/main.js")],
//         output: {
//             path: path.join(__dirname, "../dist"),
//             publicPath: '',
//             filename: "bundle.js"
//         },
//         modules: {
//             loaders: [
//                 {
//                     test: /\.js$/,
//                     exclude: /node_modeule/,
//                     loader: ['react-hot', 'babel'],
//                     query: {
//                         presents: ['es2015', 'react']
//                     }
//                 },
//                 {
//                     test: /\.css$/,
//                     loader: ExtractTextPlugin.extract(['css'])
//                 },
//                 {
//                     test: /\.styl$/,
//                     loader: ExtractTextPlugin.extract(['css', 'stylus'])
//                 },
//                 {
//                     test: /\.html$/, loader: "html"
//                 },
//                 {
//                     test: /\.jade$/, loader: "jade?pretty=true"
//                 }
//             ]
//         },
//         plugins: [
//             new webpack.HotModuleReplacementPlugin(),
//             new HtmlWebpackPlugin(Object.assign({
//                 //see default html template engine. https://github.com/blueimp/JavaScript-Templates
//                 template: path.join(__dirname,"../web/templates/bootup.jade"),
//                 filename: "bootup.html",
//                 excludeChunks: "main"
//             }, htmlWebpackPluginConfig)),
//
//             //main
//             new HtmlWebpackPlugin(Object.assign({
//                 //see default html template engine. https://github.com/blueimp/JavaScript-Templates
//                 template: path.join(__dirname , "../web/template/main.jade"),
//                 filename: "main.html",
//                 excludeChunks: "bootup"
//             }, htmlWebpackPluginConfig))
//         ]
//     }
// }
//
// let defaultConfig = webpackConfig();
// export default defaultConfig;