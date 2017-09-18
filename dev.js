var express = require('express');
var app = express();

const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.js');
const compiler = webpack(webpackConfig);
const opn = require('opn')
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
        colors: true,
    },
    historyApiFallback: true,
});

app.use(webpackDevMiddleware);

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
}));

var _resolve
var readyPromise = new Promise(resolve => {
    _resolve = resolve
})
webpackDevMiddleware.waitUntilValid(() => {
    // console.log('> Listening at ' + uri + '\n')
    // // when env is testing, don't need open it
    // if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn("http://localhost:" + app.get('port'))
    // }
    _resolve()
})

module.exports = app;