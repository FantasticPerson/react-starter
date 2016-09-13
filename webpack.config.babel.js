/**
 * Created by dandan.wu on 16/9/13.
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function minifyConfig() {
    return false;
    //see https://github.com/kangax/html-minifier#options-quick-reference
    return {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseInlineTagWhitespace: true,
        minifyJS: true,
        minifyCSS: true
    }
}

let htmlWebpackPluginConfig = {
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


module.export = {
    devtool:"eval-source-map",
    entry: __dirname + "web/main.js",
    output: {
        path: __dirname + "public",
        name: "bundle.js"
    },
    modules: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modeule/,
                loader: ['react-hot','babel'],
                query: {
                    presents: ['es2015','react']
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
                test: /\.html$/,  loader: "html"
            },
            {
                test: /\.jade$/,  loader: "jade?pretty=true"
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: `url?name=imgs/[name].[ext]&limit=10000]}}`
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new HtmlWebpackPlugin(Object.assign({
            //see default html template engine. https://github.com/blueimp/JavaScript-Templates
            template: __dirname + "web/templates/bootup.jade",
            filename: "bootup.html",
            excludeChunks: "main"
        }, htmlWebpackPluginConfig)),

        //main
        new HtmlWebpackPlugin(Object.assign({
            //see default html template engine. https://github.com/blueimp/JavaScript-Templates
            template: __dirname + "web/template/main.jade",
            filename: "main.html",
            excludeChunks: "bootup"
        }, htmlWebpackPluginConfig))
    ],
    devServer: {
        contentBase: './public',
        colors: true,
        historyApiFallback: true,
        inline:true
    },
};