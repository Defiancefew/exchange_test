const path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    devtool: (process.env.NODE_ENV == 'development') ? 'eval' : null,
    entry: (process.env.NODE_ENV == 'development') ? ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/dev-server', './client/js/common'] : './client/js/common',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            //{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
            {test: /\.html$/, exclude: /node_modules/, loader: 'raw'},
            {test: /\.css$/, loader: 'style-loader!css-loader!resolve-url' },
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, include: path.join(__dirname, './client/js')},
            {test: /\.json$/, exclude: /node_modules/, loader: "json"},

            //{test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'react-hot!babel' },
            {test: /\.sass$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 versions!resolve-url!sass?indentedSyntax=true&sourcemap=true')},
            {test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?browsers=last 2 versions!resolve-url!sass?sourceMap')},
            {test: /\.less$/, exclude: /node_modules/, loader: 'style!css!resolve-url!less'},
            {test: /\.jade$/, exclude: /node_modules/, loader: "jade"},

            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            {test: /\.woff(\?\S*)?$/, loader:"url?prefix=font/&limit=5000" },
            {test: /\.woff2(\?\S*)?$/, loader:"url?prefix=font/&limit=5000" },
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            {test: /\.jpg/, exclude: /node_modules/, loader: "file?name=[path][name].[ext]"},
            {test: /\.gif/, exclude: /node_modules/, loader: "url-loader?limit=10000&mimetype=image/gif"},
            {test: /\.png/, exclude: /node_modules/, loader: "url-loader?limit=10000&mimetype=image/png"},
            {test: /\.svg/, exclude: /node_modules/, loader: "url-loader?limit=10000&mimetype=image/svg"}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            template: './client/index.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('style.css', {disable: process.env.NODE_ENV == 'development'})
    ],
    resolve: {
        extensions: ['', '.js', '.json', '.sass'],
        modulesDirectories: ['node_modules']
    },
    resolveLoader: {
        modulesDirectories: ['node_modules'],
        modulesTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },
    noParse: /angular\/angular.js/
};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            warnings: false,
            drop_console: true,
            unsafe: true
        })
    )
}