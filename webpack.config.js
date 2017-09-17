var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash:5].css",
    disable: process.env.NODE_ENV === "development"
});
var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    // context: path.resolve(__dirname, 'src'),
    devtool: 'eval-source-map',
    entry: {
        bundle: "./src/views/index.js",
        vendor: ['mithril']
    },
    output: {
        filename: '[name].[hash:5].js',
        path: path.resolve(__dirname, 'public'),
        chunkFilename: "[id].chunk.[hash:5].js",
        publicPath: './'
    },
    module: {
        loaders: [{
            test: /\.scss$/,
            use: extractSass.extract({
                use: [{
                    loader: "css-loader"
                },
                {
                    loader: "sass-loader"
                }
                ],
                // use style-loader in development
                fallback: "style-loader"
            })
        }, {
            test: /\.jsx?$/, // 匹配'js' or 'jsx' 后缀的文件类型
            exclude: /(node_modules|bower_components)/, // 排除某些文件
            loader: 'babel-loader', // 使用'babel-loader'也是一样的
            // query: { // 参数
            //     presets: ['es2015']
            // }
        }, {
            test: /\.jade$/,
            loader: "jade-loader"
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192&name=../images/[name].[hash:8].[ext]'
        },]
    },
    plugins: [
        extractSass,
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new HtmlWebpackPlugin({
            template: 'public/html/index.html', // 模板路径
            filename: 'index.html',
            inject: true
        }),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        // new HtmlWebpackPugPlugin()
    ],
    devServer: {
        contentBase: "public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        hot: true,
        disableHostCheck: true,
        // publicPath: "http://localhost:4000/public/",
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                pathRewrite: { "^/api": "" }
            }
        },
    }
};