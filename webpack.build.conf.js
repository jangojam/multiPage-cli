const baseWebpackConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const uglify = require('uglifyjs-webpack-plugin')


module.exports = merge(baseWebpackConfig, {
    plugins: [
        new uglify()        
    ]
})