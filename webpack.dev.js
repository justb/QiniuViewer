const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    devtool: 'inline-source-map',
    entry: {
        index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', ],
        bundle: "./src/views/index.js",
        vendor: ['mithril']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.NamedModulesPlugin(),
    ]
    //  devServer: {
    //      contentBase: './dist'
    //  }
});