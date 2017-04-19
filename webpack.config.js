global.Promise = require('bluebird');

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var publicPath = '/cfg/';
var cssName = process.env.NODE_ENV === 'prod' ? 'style.[chunkhash].css' : 'style.css';
var jsHash = process.env.NODE_ENV === 'prod' ? '[name].[chunkhash].js' : '[name].js';

var plugins = [
    new CleanWebpackPlugin(['build/'], {
        root: __dirname,
        verbose: true,
        dry: false
    }),
    new ExtractTextPlugin(cssName),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['libs', 'manifest'],
        minChunks: function(module) {
            return module.context && module.context.indexOf('node_modules') !== -1;
        }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
        }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
];

module.exports = {
    entry: {
        cfgApp: ['./src/client.js'],
        libs: ['babel-polyfill', 'react', 'react-dom', 'react-router-dom']
    },
    resolve: {
        //root: path.join(__dirname, 'src'),
        modules: ['node_modules', 'src/components'],
        extensions: ['.js', '.jsx']
    },

    plugins,

    output: {
        filename: jsHash,
        path: path.resolve(__dirname, 'build'),
        publicPath
    },

    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            },
            { test: /\.gif$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.jpg$/, use: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.png$/, use: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, use: 'url-loader?limit=26000&mimetype=image/svg+xml' },
            { test: /\.(woff|woff2|ttf|eot)/, use: 'url-loader?limit=1' },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.html$/,
                use: ['file-loader?name=[name].[ext]', 'extract-loader', 'html-loader'],
                exclude:[path.resolve(__dirname, "src/index.html")]
            }
        ]
    },

    devtool: process.env.NODE_ENV === 'prod' ? 'source-map' : 'inline-source-map'
};