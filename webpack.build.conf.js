const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const uglify = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    // publicPath: 'static/css/',
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename:  (getPath) => {
            return getPath('static/css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
        new uglify()        
    ]
})