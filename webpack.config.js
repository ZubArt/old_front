const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconWebpackPlugin = require('favicons-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const buildPath = path.join(__dirname, 'dist');

const common = {
    entry: {
        app: ['./src/index.js'],
        vendors: ['angular']
    },
    output: {
        path: buildPath,
        filename: 'app.js'
    },
    resolve: {
        extensions: [
            '', '.js', '.css',
            '.styl', '.sass',
            '.scss', '.html', '.json'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('css!stylus')
            },
            {
                test: /\.jade$/,
                loader: 'jade'
            },
            {
                test: /\.(jpg|png|svg)$/,
                loader: 'file?name=images/[path][name].[ext]?[hash]'
            },
            {
                test: /\.po$/,
                loader: 'file?name=i18n/[name].json!po?format=mf'
            },
            {
                test: /\.pot$/,
                loader: 'null'
            }
        ]
    },
    plugins: [
        new CleanPlugin(['dist']),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './src/index.jade'
        }),
        // new webpack.ProvidePlugin({ angular: 'angular' }),
        new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js')
    ]
};

if (TARGET === 'translate') {
    module.exports = {
        entry: {
            app: ['./src/index.js']
        },
        output: {
            path: buildPath,
            filename: 'app.js'
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/,
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    test: /\.jade$/,
                    loader: [
                        'file?name=app.js',
                        'angular-gettext-extract-loader?pofile=src/config/template.pot',
                        'rename?[path][name].html',
                        'jade-html?pretty=true'
                    ].join('!')
                },
                {
                    test: /\.styl$/,
                    loader: 'null'
                },
                {
                    test: /\.po$/,
                    loader: 'null'
                },
                {
                    test: /\.pot$/,
                    loader: 'null'
                }
            ]
        },
        plugins: [
            new CleanPlugin(['dist']),
            new webpack.optimize.DedupePlugin()
        ]
    }
} else if (TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'source-map',
        devServer: {
            contentBase: buildPath,
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: 'localhost',
            port: '3000'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
} else if (TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new FaviconWebpackPlugin('./src/favicon.png'),
        ]
    });
}